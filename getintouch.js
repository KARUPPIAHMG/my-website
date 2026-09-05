'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null, error: null });

    try {
      const response = await fetch('https://formspree.io/f/xyeydylq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ submitting: false, success: 'Message transmitted successfully, Sir.', error: null });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        setStatus({ 
          submitting: false, 
          success: null, 
          error: data.error || 'Transmission failed. Please review the inputs.' 
        });
      }
    } catch (err) {
      setStatus({ 
        submitting: false, 
        success: null, 
        error: 'Network error encountered. Systems unresponsive.' 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={status.submitting}
        className="px-4 py-2 text-white bg-blue-600 rounded disabled:opacity-50"
      >
        {status.submitting ? 'Transmitting...' : 'Send Payload'}
      </button>

      {status.success && <p className="text-green-600 text-sm">{status.success}</p>}
      {status.error && <p className="text-red-600 text-sm">{status.error}</p>}
    </form>
  );
}