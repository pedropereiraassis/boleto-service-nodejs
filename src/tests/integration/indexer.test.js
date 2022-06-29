const supertest = require('supertest');
const { startServer } = require("../../app");

let server;

beforeAll(async () => {
  server = startServer();
  request = supertest(server)
})

afterAll(async () => {
  server.close()
})

describe('GET /boleto/:billetCode', () => {
  // cenários felizes
  test('GET /boleto/21290001192110001210904475617405975870000002000', async () => {
    const response = await request
      .get('/boleto/21290001192110001210904475617405975870000002000');

    expect(response.statusCode).toEqual(200);
    expect(response.body.barCode).toEqual('21299758700000020000001121100012100447561740');
    expect(response.body.amount).toEqual('20.00');
    expect(response.body.expirationDate).toEqual('2018-07-16');
  });

  test('GET /boleto/34190010070058744123941234510000781210000000002', async () => {
    const response = await request
      .get('/boleto/34190010070058744123941234510000781210000000002');

    expect(response.statusCode).toEqual(200);
    expect(response.body.barCode).toEqual('34197812100000000020010000587441234123451000');
    expect(response.body.amount).toEqual('0.02');
    expect(response.body.expirationDate).toEqual('2020-01-01');
  });

  test('GET /boleto/856200000037194300042026204304030057713141812105', async () => {
    const response = await request
      .get('/boleto/856200000037194300042026204304030057713141812105');

    expect(response.statusCode).toEqual(200);
    expect(response.body.barCode).toEqual('85620000003194300042022043040300571314181210');
    expect(response.body.amount).toEqual('319.43');
    expect(response.body.expirationDate).toEqual('2022-04-30');
  });

  test('GET /boleto/896100000000599800010119053332010064260000157446', async () => {
    const response = await request
      .get('/boleto/896100000000599800010119053332010064260000157446');

    expect(response.statusCode).toEqual(200);
    expect(response.body.barCode).toEqual('89610000000599800010110533320100626000015744');
    expect(response.body.amount).toEqual('59.98');
    expect(response.body.expirationDate).toEqual('2010-06-26');
  });

  // cenários não felizes
  test('GET /boleto/2129000119211000121090447561740597587000000200', async () => {
    const response = await request
      .get('/boleto/2129000119211000121090447561740597587000000200');

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Boleto inválido: linha digitada não possui a quantidade correta de caracteres.');
  });

  test('GET /boleto/212900011921100012109044756174059758700000020fg', async () => {
    const response = await request
      .get('/boleto/212900011921100012109044756174059758700000020fg');

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Boleto inválido: linha digitada do boleto deve conter apenas números.');
  });

  test('GET /boleto/00190500924014481606906809350314337370000000100', async () => {
    const response = await request
      .get('/boleto/00190500924014481606906809350314337370000000100');

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Boleto inválido: dígitos verificadores inválidos.');
  });

  test('GET /boleto/856200000037194300042025204304030057713141812105', async () => {
    const response = await request
      .get('/boleto/856200000037194300042025204304030057713141812105');

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Boleto inválido: dígitos verificadores inválidos.');
  });

  test('GET /boleto/21290001192110001210904475617435975870000002000', async () => {
    const response = await request
      .get('/boleto/21290001192110001210904475617435975870000002000');

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Boleto inválido: dígito verificador geral inválido.');
  });

  test('GET /boleto/856200000037194300442026204304030057713141812105', async () => {
    const response = await request
      .get('/boleto/856200000037194300442026204304030057713141812105');

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Boleto inválido: dígito verificador geral inválido.');
  });
});
