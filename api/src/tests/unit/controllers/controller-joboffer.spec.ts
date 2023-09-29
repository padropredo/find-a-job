import request from 'supertest'
import app from '../../../index'
import { Repository } from '../../../repository/repository-joboffer';

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

    const select = jest.spyOn(Repository.JobOffer, 'select')

    it("should send 200 when select works", async () => {
      select.mockReturnValue(Promise.resolve(sampleOffer));
      await request(app).get('/joboffer')
        .expect(200)
        .expect("Content-Type", /json/);
      expect(select).toHaveBeenCalled();

    });

    it("should send 500 when select fails", async () => {
      select.mockImplementation(() => {throw new Error() });
      await request(app).get('/joboffer')
        .expect(500)

    });
  });

  describe("POST /joboffer/:accountId", () => {

    const create = jest.spyOn(Repository.JobOffer, 'create');

    const sampleBody = {
        type: 0,
        status: 0,
        title: "",
        description:"" 
    }

    it("should send 200 when create works", async () => {
      create.mockReturnValue(Promise.resolve(sampleOffer));
      await request(app).post('/joboffer/1')
        .send(sampleBody)
        .expect(200)
        .expect("Content-Type", /json/);
      expect(create).toHaveBeenCalledWith({...sampleBody, accountId:1});

    });
    
    it("should send 500 when create fails", async () => {
      create.mockImplementation(() => {throw new Error() });
      await request(app).post('/joboffer/1')
        .expect(500)

    });
  });

  describe("PUT /joboffer", () => {

    const update = jest.spyOn(Repository.JobOffer, 'update');

    const sampleBody = {
      type: 0,
      status: 0,
      title: "",
      description: ""
    }

    it("should send 200 when update works", async () => {
      update.mockReturnValue(Promise.resolve(sampleOffer));
      await request(app).put('/joboffer')
        .send(sampleBody)
        .query({id: 1})
        .expect(200)
        .expect("Content-Type", /json/);
      expect(update).toHaveBeenCalledWith({...sampleBody, id:1});

    });

    it("should send 500 when update fails", async () => {
      update.mockImplementation(() => {throw new Error() });
      await request(app).put('/joboffer')
        .expect(500)

    });
  });

  describe("DELETE /joboffer", () => {

    const remove = jest.spyOn(Repository.JobOffer, 'remove');
    const id = 1;
    it("should send 200 when remove works", async () => {
      remove.mockReturnValue(Promise.resolve());
      await request(app).delete('/joboffer')
        .query({ id: id })
        .expect(200);
      expect(remove).toHaveBeenCalledWith({ id: [id] });

    });

    it("should send 500 when remove fails", async () => {
      remove.mockImplementation(() => {throw new Error() });
      await request(app).delete('/joboffer')
        .expect(500)

    });
  });


});