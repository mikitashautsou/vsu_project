import React from "react";

export const useAsyncEffect = (effect, dependencies = []) => {
  React.useEffect(() => {
    (async () => {
      effect();
    })();
  }, dependencies);
};
