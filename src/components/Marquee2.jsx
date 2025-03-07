import { useEffect, useState } from "react";

const Marquee2 = () => {
  const cryptoData = [
    { name: "BTC", price: "$89,280.36", change: "-2.33%" },
    { name: "ETH", price: "$2,198.19", change: "-4.38%" },
    { name: "XRP", price: "$2.5524", change: "-2.60%" },
    { name: "USDT", price: "$1.0003", change: "+0.05%" },
    { name: "BNB", price: "$602.04", change: "+1.20%" },
    { name: "SOL", price: "$143.97", change: "-5.22%" },
    { name: "USDC", price: "$1.0001", change: "+0.01%" },
    { name: "ADA", price: "$0.8855", change: "-7.33%" },
    { name: "DOGE", price: "$0.2042", change: "+3.52%" },
    { name: "TRX", price: "$0.24", change: "-1.50%" },
    { name: "TRX", price: "$0.24", change: "-1.50%" },
    { name: "USDC", price: "$1.0001", change: "+0.01%" },
    { name: "ADA", price: "$0.8855", change: "-7.33%" },
    { name: "DOGE", price: "$0.2042", change: "+3.52%" },
    { name: "TRX", price: "$0.24", change: "-1.50%" },
    { name: "TRX", price: "$0.24", change: "-1.50%" }
  ];

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([...cryptoData, ...cryptoData]); // Duplicate for infinite scrolling effect
  }, []);

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#f9fafb",
        borderBottom: "1px solid #e5e7eb",
        padding: "8px 0",
        whiteSpace: "nowrap",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000"
      }}
    >
      <div
        style={{
          display: "flex",
          animation: "marquee 15s linear infinite",
          willChange: "transform"
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "32px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151"
            }}
          >
            <span style={{ fontWeight: "bold", marginRight: "6px" }}>
              {item.name}
            </span>
            <span style={{ marginRight: "6px" }}>{item.price}</span>
            <span
              style={{
                color: item.change.startsWith("-") ? "#ef4444" : "#10b981", // Red for loss, Green for profit
                fontWeight: "bold"
              }}
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default Marquee2;
