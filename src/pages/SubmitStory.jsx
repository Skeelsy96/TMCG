import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';

export default function SubmitStory() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    business: '',
    vanType: 'Large Van',
    title: '',
    story: '',
    imageUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubmitting(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      handleChange('imageUrl', file_url);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await base44.analytics.track({ eventName: 'submit_story', properties: { van_type: form.vanType } });
      // Email to team (you can adjust recipients in dashboard if needed)
      await base44.integrations.Core.SendEmail({
        to: 'info@themobilecoffeegroup.com.au',
        subject: `New Van Story Submission: ${form.title || form.business || form.name}`,
        body: `Name: ${form.name}\nEmail: ${form.email}\nBusiness: ${form.business}\nVan Type: ${form.vanType}\nImage: ${form.imageUrl}\n\nStory:\n${form.story}`
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
        <div className="bg-white border border-[#DBDBDB] rounded-2xl p-10 max-w-xl text-center">
          <h1 className="text-3xl font-bold text-black mb-3">Thank you!</h1>
          <p className="text-[#333333]">Your story has been sent to our team. We may contact you if we choose to feature it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-black mb-6">Submit Your Van Build Story</h1>
        <form onSubmit={handleSubmit} className="bg-white border border-[#DBDBDB] rounded-2xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-black">Name</Label>
              <Input value={form.name} onChange={(e) => handleChange('name', e.target.value)} required className="mt-2" />
            </div>
            <div>
              <Label className="text-black">Email</Label>
              <Input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} required className="mt-2" />
            </div>
            <div>
              <Label className="text-black">Business Name</Label>
              <Input value={form.business} onChange={(e) => handleChange('business', e.target.value)} className="mt-2" />
            </div>
            <div>
              <Label className="text-black">Van Type</Label>
              <Select value={form.vanType} onValueChange={(v) => handleChange('vanType', v)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Compact Van">Compact Van</SelectItem>
                  <SelectItem value="Large Van">Large Van</SelectItem>
                  <SelectItem value="Walk-In Van">Walk-In Van</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Ute">Ute</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-black">Story Title</Label>
            <Input value={form.title} onChange={(e) => handleChange('title', e.target.value)} required className="mt-2" />
          </div>

          <div>
            <Label className="text-black">Your Story</Label>
            <Textarea value={form.story} onChange={(e) => handleChange('story', e.target.value)} required className="mt-2 min-h-[160px]" placeholder="Share your journey, challenges, wins, and advice for others..." />
          </div>

          <div>
            <Label className="text-black">Photos (optional)</Label>
            <div className="flex items-center gap-3 mt-2">
              <Input type="file" accept="image/*" onChange={handleImage} />
              {form.imageUrl && <a href={form.imageUrl} target="_blank" className="text-[#FDD202]">View Uploaded</a>}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={submitting} className="bg-[#FDD202] text-black hover:bg-[#f5c400]">
              {submitting ? 'Submitting...' : 'Submit Story'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}