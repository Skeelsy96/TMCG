import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Helpers
    const fetchAll = async (entityName) => {
      // Fetch up to 10k records in one go (SDK supports limit param)
      const items = await base44.asServiceRole.entities[entityName].filter({}, '-created_date', 10000);
      return items || [];
    };

    const sourceVans = await fetchAll('CoffeeVan');
    const sourceImages = await fetchAll('CoffeeVanImage');
    const sourcePackages = await fetchAll('ListingPackage');

    const createdMap = new Map(); // oldVanId -> newVanId
    let vansCreated = 0;
    let vansSkipped = 0;

    // Migrate CoffeeVan -> PreLovedVanListings
    for (const van of sourceVans) {
      // Try to find existing target by common identifiers to avoid duplicates
      const maybeExisting = await base44.asServiceRole.entities.PreLovedVanListings.filter({
        title: van.title,
        price: van.price,
        created_by: van.created_by || undefined,
      }, '-created_date', 1);

      if (maybeExisting && maybeExisting.length > 0) {
        createdMap.set(van.id, maybeExisting[0].id);
        vansSkipped += 1;
        continue;
      }

      const payload = {
        title: van.title,
        price: van.price,
        location: van.location,
        state: van.state,
        Vehicle_type: van.Vehicle_type,
        set_up_style: van.set_up_style,
        trailer_type: van.trailer_type,
        van_type: van.van_type,
        truck_body_type: van.truck_body_type,
        Vehicle_Make: van.Vehicle_Make,
        Vehicle_Model: van.Vehicle_Model,
        year_built: van.year_built,
        year_fitout: van.year_fitout,
        Kms: van.Kms,
        condition: van.condition,
        description: van.description,
        features: van.features,
        images: van.images,
        main_image: van.main_image,
        power_source: van.power_source,
        water_system_type: van.water_system_type,
        seller_name: van.seller_name,
        seller_phone: van.seller_phone,
        seller_email: van.seller_email,
        status: van.status,
        featured: van.featured,
        built_by_tmcg: van.built_by_tmcg,
        views: van.views,
      };

      const created = await base44.asServiceRole.entities.PreLovedVanListings.create(payload);
      createdMap.set(van.id, created.id);
      vansCreated += 1;
    }

    // Migrate CoffeeVanImage -> PreLovedVanImages
    let imagesCreated = 0;
    let imagesSkipped = 0;
    for (const img of sourceImages) {
      const newVanId = createdMap.get(img.coffee_van_id);
      if (!newVanId) {
        imagesSkipped += 1;
        continue;
      }

      // Avoid duplicate image by URL + new van id
      const exists = await base44.asServiceRole.entities.PreLovedVanImages.filter({
        coffee_van_id: newVanId,
        file_url: img.file_url,
      }, '-created_date', 1);

      if (exists && exists.length > 0) {
        imagesSkipped += 1;
        continue;
      }

      await base44.asServiceRole.entities.PreLovedVanImages.create({
        coffee_van_id: newVanId,
        file_url: img.file_url,
        caption: img.caption,
        is_main: img.is_main,
        order: img.order,
      });
      imagesCreated += 1;
    }

    // Migrate ListingPackage -> PreLovedVanListingPackages
    let packagesCreated = 0;
    let packagesSkipped = 0;
    for (const pkg of sourcePackages) {
      const existing = await base44.asServiceRole.entities.PreLovedVanListingPackages.filter({ code: pkg.code }, '-created_date', 1);
      if (existing && existing.length > 0) {
        packagesSkipped += 1;
        continue;
      }
      await base44.asServiceRole.entities.PreLovedVanListingPackages.create({
        code: pkg.code,
        name: pkg.name,
        price_aud: pkg.price_aud,
        description: pkg.description,
        features: pkg.features,
        featured_duration_days: pkg.featured_duration_days,
        social_promotion: pkg.social_promotion,
        listing_count: pkg.listing_count,
        is_active: pkg.is_active,
      });
      packagesCreated += 1;
    }

    return Response.json({
      success: true,
      summary: {
        vans: { created: vansCreated, skipped_existing: vansSkipped, total_source: sourceVans.length },
        images: { created: imagesCreated, skipped: imagesSkipped, total_source: sourceImages.length },
        packages: { created: packagesCreated, skipped_existing: packagesSkipped, total_source: sourcePackages.length },
      }
    });
  } catch (error) {
    return Response.json({ error: error?.message || String(error) }, { status: 500 });
  }
});