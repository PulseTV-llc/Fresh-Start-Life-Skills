/**
 * Renders a schema.org graph into the document.
 *
 * `<script type="application/ld+json">` is inert — the browser never executes
 * it — but we still escape `<` so a stray sequence in the data can't close the
 * tag early.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
