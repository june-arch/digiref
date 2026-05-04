export const headerAuth = {
  type: "object",
  properties: {
    Authorization: { type: "string" },
  },
  required: ["Authorization"],
}