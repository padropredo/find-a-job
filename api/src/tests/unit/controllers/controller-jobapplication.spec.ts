import request from 'supertest'
import app from '../../../index'
import { Repository } from '../../../repository/repository-jobapplication';

describe('JobApplication', () => {
  afterAll(() => {
    app.close();
  });
  
  const sampleApplication = [{
    id: 0,
    candidateprofile_id: 0,
    joboffer_id: 0,
    create_time: "",
    update_time: ""
  }];

  const sampleBody = {
    candidateProfileId: 0,
    jobOfferId: 0
  }


  describe("GET /jobapplication", () => {

    const select = jest.spyOn(Repository.JobApplication, 'select');

    it("should send 200 when select works", async () => {
      select.mockReturnValue(Promise.resolve(sampleApplication));
      await request(app).get('/jobapplication')
        .expect(200)
        .expect("Content-Type", /json/);
      expect(select).toHaveBeenCalled();
    });

    it("should send 500 when select fails", async () => {
      select.mockImplementation(() => {throw new Error });
      await request(app).get('/jobapplication')
        .expect(500)

    });
  });

  describe("POST /jobapplication/", () => {

    const create = jest.spyOn(Repository.JobApplication, 'create');


    it("should send 200 when create works", async () => {
      create.mockReturnValue(Promise.resolve(sampleApplication));
      await request(app).post('/jobapplication')
        .send(sampleBody)
        .expect(200)
        .expect("Content-Type", /json/);
      expect(create).toHaveBeenCalledWith(sampleBody);

    });

    it("should send 500 when create fails", async () => {
      create.mockImplementation(() => {throw new Error });
      await request(app).post('/jobapplication')
        .expect(500)

    });
  });

  describe("PUT /jobapplication", () => {

    const update = jest.spyOn(Repository.JobApplication, 'update');

    it("should send 200 when update work", async () => {
      update.mockReturnValue(Promise.resolve(sampleApplication));
      await request(app).put('/jobapplication')
        .send(sampleBody)
        .query({ id: 1 })
        .expect(200)
        .expect("Content-Type", /json/);
      expect(update).toHaveBeenCalledWith({ ...sampleBody, id: 1 });

    });

    it("should send 500 when update fail", async () => {
      update.mockImplementation(() => {throw new Error });
      await request(app).put('/jobapplication')
        .expect(500)

    });
  });

  describe("DELETE /jobapplication", () => {

    const remove = jest.spyOn(Repository.JobApplication, 'remove');
    const id = 1;
    it("should send 200 remove works", async () => {
      remove.mockReturnValue(Promise.resolve());
      await request(app).delete('/jobapplication')
        .query({ id: id })
        .expect(200);
      expect(remove).toHaveBeenCalledWith({ id: [id] });

    });

    it("should send 500 when remove fail", async () => {
      remove.mockImplementation(() => {throw new Error });
      await request(app).delete('/jobapplication')
        .expect(500)

    });
  });


});