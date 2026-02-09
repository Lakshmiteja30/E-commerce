// src/stores/pages/SearchResults.jsx
import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

/* IMPORT ALL DATA ARRAYS YOU HAVE (adjust paths if different) */
import { mobileData } from "../data/mobiles";
import { computerData } from "../data/computers";
import { acData } from "../data/ac";
import { fridgeData } from "../data/fridge";
import { menData } from "../data/men";
import { womanData } from "../data/woman";
import { furnitureData } from "../data/furniture";
import { kitchenData } from "../data/kitchen";
import { watchData } from "../data/watch";

/* Utility to get query param */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const q = useQuery().get("q") || "";
  const query = q.trim().toLowerCase();

  const allProducts = [
    ...mobileData,
    ...computerData,
    ...acData,
    ...fridgeData,
    ...menData,
    ...womanData,
    ...furnitureData,
    ...kitchenData,
    ...watchData,
  ];

  const filtered = useMemo(() => {
    if (!query) return allProducts; // show all when q empty (change if you want empty)
    return allProducts.filter((item) => {
      // merge important fields and fallback to Object.values for flexibility
      const searchable = [
        item.product,
        item.company || item.brand || "",
        item.model || "",
        item.title || "",
        item.author || "",
        item.type || "",
        item.category || "",
        item.description || "",
        item.price || "",
        // fallback: include any other string fields
        ...Object.values(item)
          .filter(v => typeof v === "string" && v.length < 200) // avoid huge blobs
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [allProducts, query]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Search results {query ? `for "${q}"` : ""}</h2>

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="proSection" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {filtered.map((item, index) => {
            const key = item.id ?? item.model ?? `${item.product}-${index}`;
            // try to derive a product route (adjust route patterns to your app)
            // if you have category detail routes like /mobiles/:id you can map them here; fallback to '#'
            const link = (() => {
              const lower = (item.product || "").toLowerCase();
              if (lower.includes("mobile")) return `/mobiles/${item.id ?? ""}`;
              if (lower.includes("computer")) return `/computers/${item.id ?? ""}`;
              if (lower.includes("ac") || lower.includes("air")) return `/ac/${item.id ?? ""}`;
              if (lower.includes("fridge") || lower.includes("refrigerator")) return `/fridge/${item.id ?? ""}`;
              if (lower.includes("furniture")) return `/furniture/${item.id ?? ""}`;
              if (lower.includes("kitchen")) return `/kitchen/${item.id ?? ""}`;
              if (lower.includes("watch")) return `/watch/${item.id ?? ""}`;
              if (lower.includes("mens") || lower.includes("men")) return `/men/${item.id ?? ""}`;
              if (lower.includes("woman")) return `/woman/${item.id ?? ""}`;
              return "#";
            })();

            return (
              <div key={key} className="imgBox" style={{ border: "1px solid #eee", padding: 8, borderRadius: 6 }}>
                <Link to={link}>
                  <img src={item.image} alt={item.product || item.title} style={{ width: "100%", height: 140, objectFit: "cover" }} />
                </Link>
                <div style={{ paddingTop: 8 }}>
                  <strong style={{ display: "block" }}>{item.title ?? item.product ?? item.model}</strong>
                  <small style={{ display: "block" }}>{(item.company || item.brand || item.author || "")} {item.model ? `- ${item.model}` : ""}</small>
                  <div style={{ marginTop: 6 }}>₹{item.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
