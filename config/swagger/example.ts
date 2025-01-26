// const UserIdSchema = openAPIRegistry.registerParameter(
//   'UserId',
//   z.string().openapi({
//     param: {
//       name: 'id',
//       in: 'path',
//     },
//     example: '1212121',
//   }),
// );

// const UserSchema = z
//   .object({
//     id: z.string().openapi({
//       example: '1212121',
//     }),
//     name: z.string().openapi({
//       example: 'John Doe',
//     }),
//     age: z.number().openapi({
//       example: 42,
//     }),
//   })
//   .openapi('User');

// const bearerAuth = openAPIRegistry.registerComponent(
//   'securitySchemes',
//   'bearerAuth',
//   {
//     type: 'http',
//     scheme: 'bearer',
//     bearerFormat: 'JWT',
//   },
// );

// openAPIRegistry.registerPath({
//   method: 'get',
//   path: '/users/{id}',
//   description: 'Get user data by its id',
//   summary: 'Get a single user',
//   security: [{ [bearerAuth.name]: [] }],
//   request: {
//     params: z.object({ id: UserIdSchema }),
//   },
//   responses: {
//     200: {
//       description: 'Object with user data.',
//       content: {
//         'application/json': {
//           schema: UserSchema,
//         },
//       },
//     },
//     204: {
//       description: 'No content - successful operation',
//     },
//   },
// });
