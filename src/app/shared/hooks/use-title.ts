import { useEffect } from "react";

const useTitle = (title: string) => {
  const baseTitle = "Gothings";

  useEffect(() => {
    document.title = title + " | " + baseTitle;
  }, [title]);
};

export default useTitle;
