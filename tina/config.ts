import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  telemetry: "disabled",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "books",
      publicFolder: "public"
    },
    accept: ["image/*"]
  },
  schema: {
    collections: [
      {
        name: "book",
        label: "Livros",
        path: "content/books",
        format: "json",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
            createFolder: false
          },
          filename: {
            showFirst: true,
            description:
              "Use o mesmo texto do slug, sem acentos e com hifens. Exemplo: jardim-da-graca",
            slugify: (values) =>
              slugify(String(values?.slug || values?.title || "novo-livro"))
          },
          router: ({ document }) => `/pt/livros/${document._sys.filename}`
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titulo",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
            description:
              "Endereco do livro no site. Use letras minusculas, numeros e hifens."
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            required: true
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Descricao curta",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "summary",
            label: "Resumo completo",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "price",
            label: "Preco",
            required: true,
            description:
              "Digite apenas o valor, exemplo: 39,90. O site adiciona R$ automaticamente."
          },
          {
            type: "image",
            name: "coverImage",
            label: "Capa do livro",
            required: true,
            uploadDir: () => "books"
          },
          {
            type: "string",
            name: "hotmartUrl",
            label: "Link da Hotmart",
            required: true
          },
          {
            type: "string",
            name: "language",
            label: "Idioma",
            required: true,
            options: [
              { value: "pt", label: "Português" },
              { value: "es", label: "Español" },
              { value: "en", label: "English" }
            ]
          },
          {
            type: "string",
            name: "format",
            label: "Formato",
            required: true,
            description: "Exemplo: Digital/PDF"
          },
          {
            type: "number",
            name: "pages",
            label: "Numero de paginas"
          },
          {
            type: "boolean",
            name: "featured",
            label: "Livro em destaque"
          },
          {
            type: "boolean",
            name: "active",
            label: "Livro ativo no site",
            description:
              "Quando desmarcado, o livro permanece no CMS, mas nao aparece na vitrine."
          },
          {
            type: "datetime",
            name: "createdAt",
            label: "Data de criacao/publicacao",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: false
            }
          },
          {
            type: "object",
            name: "translations",
            label: "Traduções opcionais",
            description:
              "Preencha apenas os idiomas desejados. Campos vazios usam automaticamente o conteúdo original do livro.",
            fields: [
              {
                type: "object",
                name: "pt",
                label: "Conteúdo em português",
                fields: [
                  { type: "string", name: "title", label: "Título" },
                  { type: "string", name: "category", label: "Categoria" },
                  { type: "string", name: "shortDescription", label: "Descrição curta", ui: { component: "textarea" } },
                  { type: "string", name: "summary", label: "Resumo completo", ui: { component: "textarea" } }
                ]
              },
              {
                type: "object",
                name: "es",
                label: "Contenido en español",
                fields: [
                  { type: "string", name: "title", label: "Título" },
                  { type: "string", name: "category", label: "Categoría" },
                  { type: "string", name: "shortDescription", label: "Descripción corta", ui: { component: "textarea" } },
                  { type: "string", name: "summary", label: "Resumen completo", ui: { component: "textarea" } }
                ]
              },
              {
                type: "object",
                name: "en",
                label: "Content in English",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "category", label: "Category" },
                  { type: "string", name: "shortDescription", label: "Short description", ui: { component: "textarea" } },
                  { type: "string", name: "summary", label: "Full summary", ui: { component: "textarea" } }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
