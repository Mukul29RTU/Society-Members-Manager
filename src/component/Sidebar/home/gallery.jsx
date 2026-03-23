import React from 'react';

const Gallery = () => {
  const images = [
    { id: 1, src: "https://images.bhaskarassets.com/webp/thumb/512x0/web2images/521/2022/09/26/d6c05d80-e652-4ad6-9748-f4413f68f7bb_1664193089187.jpg", title: "Annual Meeting", desc: "Members gathering for the yearly review." },
    { id: 2, src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500", title: "Cultural Fest", desc: "Celebrating our heritage and traditions." },
    { id: 3, src: "https://images.unsplash.com/photo-1464047736614-af63643285bf?q=80&w=500", title: "Charity Drive", desc: "Contributing to the 'Ek Eent, Ek Rupaiya' mission." },
    { id: 4, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=500", title: "Youth Workshop", desc: "Empowering the next generation." },
  ];

  return (
    <section className="py-2 bg-white">
      <div className="container">
    
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {images.map((img) => (
            <div className="col" key={img.id}>
              <div className="card h-100 shadow-sm border-0 overflow-hidden gallery-card">
                <div className="img-container" style={{ height: '200px', overflow: 'hidden' }}>
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="card-img-top w-100 h-100 transition-transform"
                    style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold text-primary mb-1">{img.title}</h5>
                  <p className="card-text small text-muted">{img.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal CSS for Hover Effect */}
      <style>{`
        .gallery-card:hover img {
          transform: scale(1.1);
        }
        .gallery-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .gallery-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </section>
  );
};

export default Gallery;