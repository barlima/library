export const request = async (...params: Parameters<typeof fetch>) => {
  try {
    const response = await fetch(...params);
    const data = await response.json();

    const path = params[0];

    if (typeof path === "string" && path.includes("?")) {
      const query = path.split("?")[1];
      const searchParams = new URLSearchParams(query);

      const id = searchParams.get("id");

      if (id) {
        return data.find((item: any) => item.id === Number(id));
      }
    }

    return data;
  } catch (e) {
    console.log("Unable to fetch");
    return { error: true };
  }
};
