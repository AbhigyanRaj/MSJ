import React, { useEffect, useRef } from 'react';

const Marquee = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const clone = marquee.innerHTML;
    marquee.innerHTML += clone; // Duplicates content for seamless looping
  }, []);

  const testimonials = [
    {
      color: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      name: 'Elon Web3',
      handle: '@elonweb3',
      testimonial: "MSJ is my go-to source for the latest in Web3 and NFTs!",
    },
    {
      color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      name: 'CryptoQueen',
      handle: '@cryptoqueen',
      testimonial: 'Best platform to explore blockchain news and trends.',
    },
    {
      color: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
      name: 'DeFiDegen',
      handle: '@defidegen',
      testimonial: 'A must-read for anyone serious about DeFi and blockchain!',
    },
    {
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      name: 'NFTWhale',
      handle: '@nftwhale',
      testimonial: 'The NFT insights here are unmatched.',
    },
    {
      color: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      name: 'BlockBuilder',
      handle: '@blockbuilder',
      testimonial: 'Amazing platform for Web3 content and expert opinions!',
    },
    {
      color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      name: 'MetaverseGuru',
      handle: '@metaguru',
      testimonial: 'MSJ makes it easy to stay ahead in the metaverse!',
    },
    {
      color: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
      name: 'DAOEnthusiast',
      handle: '@daoenthusiast',
      testimonial: 'Everything you need to know about DAOs, in one place.',
    },
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-content" ref={marqueeRef}>
        {testimonials.map((item, index) => (
          <div key={index} className="testimonial-box">
            <div
              className="color-circle"
              style={{ background: item.color }}
            ></div>
            <div className="text-content">
              <p className="name">{item.name}</p>
              <p className="handle">{item.handle}</p>
              <p className="testimonial">{item.testimonial}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          padding: 10px 0;
        }

        .marquee-content {
          display: flex;
          animation: marqueeScroll 30s linear infinite;
          width: max-content;
        }

        .testimonial-box {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background-color: white;
          border-radius: 12px;
          padding: 16px;
          margin-right: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          min-width: 300px;
        }

        .color-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .text-content {
          text-align: left;
        }

        .name {
          font-weight: bold;
          font-size: 16px;
        }

        .handle {
          color: gray;
          font-size: 14px;
        }

        .testimonial {
          font-size: 14px;
          color: #444;
        }

        @keyframes marqueeScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
