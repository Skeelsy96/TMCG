import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { vanId, fileUrl, caption = '', isMain = false, order = 0 } = await req.json();

    if (!vanId || !fileUrl) {
      return Response.json({ error: 'vanId and fileUrl are required' }, { status: 400 });
    }

    // Create image record
    const image = await base44.entities.PreLovedVanImages.create({
      coffee_van_id: vanId,
      file_url: fileUrl,
      caption,
      is_main: !!isMain,
      order: typeof order === 'number' ? order : 0,
    });

    // Optionally set as main image on the listing
    if (isMain) {
      try {
        await base44.entities.CoffeeVan.update(vanId, { main_image: fileUrl });
      } catch (_err) {
        // Non-fatal: ignore if updating main image fails
      }
    }

    return Response.json({ success: true, image });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});