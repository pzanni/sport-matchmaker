const subtract = (a, b) => a - b
const helloNameGreeting = (name) => `Hi ${name}`

it('should subtract from first number', () => {
  const result = subtract(3, 1)
  expect(result).toBe(2)
})

it('should greet given user', () => {
  const result = helloNameGreeting('anton')
  expect(result).toBe(`Hi anton`)
})