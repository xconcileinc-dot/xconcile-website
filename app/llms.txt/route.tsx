export async function GET() {
  const text = `# Xconcile

> Xconcile provides outsourced accounting services.

Website: https://xconcile.com
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}