// import React, { createElement } from "react";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch";
import { Autocomplete } from "./Autocomplete";
import { useState } from "react";
import { useEffect } from "react";
import "@algolia/autocomplete-theme-classic";

// const appId = "latency";
// const apiKey = "6be0576ff61c053d5f9a3225e2a90f76";
const appId = "X108EESE6B";
const apiKey = "8a4ee136c4bd91ea4252b178ce02a482";
const searchClient = algoliasearch(appId, apiKey);
function SearchAlgolia() {
  return (
    <div className="app-container">
      <Autocomplete
        openOnFocus={true}
        getSources={({ query }) => [
          {
            sourceId: "products",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: "dev_test",
                    query,
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return <ProductItem hit={item} components={components} />;
              },
            },
          },
        ]}
      />
    </div>
  );
}
function ProductItem({ hit, components }) {
  const [path, setPath] = useState("");
  useEffect(() => {
    if (hit && hit.firstName) {
      setPath(`/doctor/${hit.id}`);
    } else if (hit && hit.address) {
      setPath(`/clinic/${hit.id}`);
    } else {
      setPath(`/specialty/${hit.id}`);
    }
  }, [hit, components]);

  return (
    <a href={path} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="name" />
          <components.Highlight hit={hit} attribute="lastName" />
        </div>
      </div>
    </a>
  );
}

export default SearchAlgolia;
