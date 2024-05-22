export async function sendFileToServer(formData: FormData, url: string) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to convert image to LaTeX");
    }

    return await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "An unexpected error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
