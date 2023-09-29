import request from 'supertest'
import app from '../index'
import { Repository } from '../repository/repository-joboffer';

describe('JobOffer', () => {
  afterAll(() => {
    app.close();
  });
  const sampleOffer = [
    {
        "id": 0,
        "account_id": 0,
        "type": 0,
        "status": 0,
        "title": "",
        "description": "",
        "create_time": "",
        "update_time": ""
    }
];

  describe("GET /joboffer", () => {

    const select = jest.spyOn(Repository.JobOffer, 'select').mockReturnValue(Promise.resolve(sampleOffer));

    it("should send 200 ", async () => {
      await request(app).get('/joboffer')
        .expect(200)
        .expect("Content-Type", /json/);
      expect(select).toHaveBeenCalled();

    });
  });

  describe("POST /joboffer/:accountId", () => {

    const create = jest.spyOn(Repository.JobOffer, 'create').mockReturnValue(Promise.resolve(sampleOffer));

    const sampleBody = {
        type: 0,
        status: 0,
        title: "",
        description:"" 
    }

    it("should send 200", async () => {
      await request(app).post('/joboffer/1')
        .send(sampleBody)
        .expect(200)
        .expect("Content-Type", /json/);
      expect(create).toHaveBeenCalledWith({...sampleBody, accountId:1});

    });
  });

  describe("PUT /joboffer", () => {

    const update = jest.spyOn(Repository.JobOffer, 'update').mockReturnValue(Promise.resolve(sampleOffer));

    const sampleBody = {
      type: 0,
      status: 0,
      title: "",
      description: ""
    }

    it("should send 200", async () => {
      await request(app).put('/joboffer')
        .send(sampleBody)
        .query({id: 1})
        .expect(200)
        .expect("Content-Type", /json/);
      expect(update).toHaveBeenCalledWith({...sampleBody, id:1});

    });
  });

  describe("DELETE /joboffer", () => {

    const remove = jest.spyOn(Repository.JobOffer, 'remove').mockReturnValue(Promise.resolve());
    const id = 1;
    it("should send 200", async () => {
      await request(app).delete('/joboffer')
        .query({ id: id })
        .expect(200);
      expect(remove).toHaveBeenCalledWith({ id: [id] });

    });
  });


});