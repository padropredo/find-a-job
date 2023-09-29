import request from 'supertest'
import app from '../../../index'
import { Repository } from '../../../repository/repository-account';

describe('Account', () => {
  afterAll(() => {
    app.close();
  });
  
  const sampleAccount = {
    id: 1,
    email: "example@email.com",
    password: "123",
    type: 0,
    create_date: "2023-09-27T13:27:25.898Z",
    update_time: "2023-09-27T13:27:25.898Z"
  };
  const sampleBody = {

    email: "example@email.com",
    password: 123,
    type: 0

  }
  describe("GET /account", () => {

    const select = jest.spyOn(Repository.Account, 'select');

    const email = "example@email.com"

    it("should send 200 when select works", async () => {
      select.mockReturnValue(Promise.resolve(sampleAccount));
      await request(app).get('/account')
        .query({ email })
        .expect("Content-Type", /json/)
        .expect(200);
      expect(select).toHaveBeenCalledWith({ email });

    });
    it("should send 500 when select fails", async () => {
      select.mockImplementation(() => {throw new Error });
      await request(app).get('/account')
        .expect(500)

    });
  });

  describe("POST /account", () => {

    const create = jest.spyOn(Repository.Account, 'create');



    it("should send 200 when create", async () => {
      create.mockReturnValue(Promise.resolve(sampleAccount))
      await request(app).post('/account')
        .send(sampleBody)
        .expect("Content-Type", /json/)
        .expect(200);
      expect(create).toHaveBeenCalledWith(sampleBody);

    });
    it("should send 500 when create fails", async () => {
      create.mockImplementation(() => {throw new Error });
      await request(app).post('/account')
        .expect(500)

    });
  });


  describe("DELETE /account", () => {

    const remove = jest.spyOn(Repository.Account, 'remove');
    const id = 1;
    it("should send 200 when remove works", async () => {
      remove.mockReturnValue(Promise.resolve());
      await request(app).delete('/account')
        .query({ id: id })
        .expect(200);
      expect(remove).toHaveBeenCalledWith({ id: id });

    });

    it("should send 500 when remove fails", async () => {
      remove.mockImplementation(() => {throw new Error });
      await request(app).delete('/account')
        .expect(500)

    });
  });


});