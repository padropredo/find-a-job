import request from 'supertest'
import app from '../index'
import { Repository } from '../repository/repository-account';

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

    const select = jest.spyOn(Repository.Account, 'select').mockReturnValue(Promise.resolve(sampleAccount));

    const email = "example@email.com"

    it("should send 200 when email in query", async () => {
      await request(app).get('/account')
        .query({ email })
        .expect("Content-Type", /json/)
        .expect(200);
      expect(select).toHaveBeenCalledWith({ email });

    });
    it("should send 500 when no email in query", async () => {
      await request(app).get('/account')
        .expect(500);
      expect(select).toHaveBeenCalledWith({ email });

    });
  });

  describe("POST /account", () => {

    const create = jest.spyOn(Repository.Account, 'create').mockReturnValue(Promise.resolve(sampleAccount));



    it("should send 200 when body is complete", async () => {
      await request(app).post('/account')
        .send(sampleBody)
        .expect("Content-Type", /json/)
        .expect(200);
      expect(create).toHaveBeenCalledWith(sampleBody);

    });
  });


  describe("DELETE /account", () => {

    const remove = jest.spyOn(Repository.Account, 'remove').mockReturnValue(Promise.resolve());
    const id = 1;
    it("should send 200", async () => {
      await request(app).delete('/account')
        .query({ id: id })
        .expect(200);
      expect(remove).toHaveBeenCalledWith({ id: id });

    });
  });


});