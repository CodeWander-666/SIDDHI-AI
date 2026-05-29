'use client';
import { useState, useEffect } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image_base64: string;
  dev_name: string;
  created_at: number;
}

export function Marketplace() {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [devName, setDevName] = useState('');

  const fetchServices = async () => {
    const res = await fetch('/api/ki-marketplace');
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
    const interval = setInterval(fetchServices, 5000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 102400) {
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      alert('Image must be under 100KB');
    }
  };

  const addService = async () => {
    if (!title.trim() || !imageBase64) return;
    await fetch('/api/ki-marketplace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        title,
        description,
        price,
        imageBase64,
        devName: devName || 'Anonymous Dev',
      }),
    });
    setShowForm(false);
    setTitle('');
    setDescription('');
    setPrice('');
    setImageBase64('');
    setDevName('');
    fetchServices();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif">KI Marketplace</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-cyan-600 px-4 py-2 rounded-full text-sm">+ Add Service</button>
      </div>

      {showForm && (
        <div className="glass-card p-4 rounded-xl space-y-3">
          <input type="text" placeholder="Service Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/50 rounded-lg px-3 py-2" />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black/50 rounded-lg px-3 py-2" rows={2} />
          <input type="text" placeholder="Price (e.g., ₹5,000/month)" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-black/50 rounded-lg px-3 py-2" />
          <input type="text" placeholder="Your Name" value={devName} onChange={e => setDevName(e.target.value)} className="w-full bg-black/50 rounded-lg px-3 py-2" />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-gray-400" />
          {imageBase64 && <img src={imageBase64} alt="preview" className="w-24 h-24 object-cover rounded-lg" />}
          <button onClick={addService} className="bg-gold-600 px-4 py-2 rounded-full">Publish Service</button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="glass-card p-4 rounded-xl hover:scale-105 transition">
            {service.image_base64 && <img src={service.image_base64} alt={service.title} className="w-full h-40 object-cover rounded-lg mb-3" />}
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{service.description}</p>
            <p className="text-gold-400 font-bold mt-2">{service.price}</p>
            <p className="text-xs text-gray-500">by {service.dev_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
