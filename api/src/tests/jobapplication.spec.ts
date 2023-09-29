import request from 'supertest'
import app from '../index'
import { Repository } from '../repository/repository-jobapplication';

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

    const select = jest.spyOn(Repository.JobApplication, 'select').mockReturnValue(Promise.resolve(sampleApplication));

    it("should send 200 ", async () => {
      await request(app).get('/jobapplication')
        .expect(200)
        .expect("Content-Type", /json/);
      expect(select).toHaveBeenCalled();
    });
  });

  describe("POST /jobapplication/", () => {

    const create = jest.spyOn(Repository.JobApplication, 'create').mockReturnValue(Promise.resolve(sampleApplication));


    it("should send 200", async () => {
      await request(app).post('/jobapplication')
        .send(sampleBody)
        .expect(200)
        .expect("Content-Type", /json/);
      expect(create).toHaveBeenCalledWith(sampleBody);

    });
  });

  describe("PUT /jobapplication", () => {

    const update = jest.spyOn(Repository.JobApplication, 'update').mockReturnValue(Promise.resolve(sampleApplication));

    it("should send 200", async () => {
      await request(app).put('/jobapplication')
        .send(sampleBody)
        .query({ id: 1 })
        .expect(200)
        .expect("Content-Type", /json/);
      expect(update).toHaveBeenCalledWith({ ...sampleBody, id: 1 });

    });
  });

  describe("DELETE /jobapplication", () => {

    const remove = jest.spyOn(Repository.JobApplication, 'remove').mockReturnValue(Promise.resolve());
    const id = 1;
    it("should send 200", async () => {
      await request(app).delete('/jobapplication')
        .query({ id: id })
        .expect(200);
      expect(remove).toHaveBeenCalledWith({ id: [id] });

    });
  });


});