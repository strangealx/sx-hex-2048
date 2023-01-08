const mockAxios = {
  create: jest.fn(() => mockAxios),
  post: jest.fn()
}

export default mockAxios