export async function uploadImage(formData: FormData): Promise<string> {
  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload mislukt');

  const data = await res.json();
  return data.url;
}