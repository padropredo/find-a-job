import request from 'supertest'
import app from '../../../index'
import { Repository } from '../../../repository/repository-candidateprofile';

fdescribe('CandidateProfile', () => {
  afterAll(() => {
    app.close();
  });

  const sampleCandidate = [
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

  const sampleBody = {
    type: 0,
    status: 0,
    title: "",
    description: ""
  }

  describe("GET /candidateprofile", () => {

    const select = jest.spyOn(Repository.CandidateProfile, 'select');

    it("should send 200 when select works", async () => {
      select.mockReturnValue(Promise.resolve(sampleCandidate));
      await request(app).get('/candidateprofile')
        .expect(200)
        .expect("Content-Type", /json/);
      expect(select).toHaveBeenCalled();

    });

    it("should send 500 when select fails", async () => {
      select.mockImplementation(() => {throw new Error });
      await request(app).get('/candidateprofile')
        .expect(500)

    });
  });

  describe("POST /candidateprofile/:accountId", () => {

    const create = jest.spyOn(Repository.CandidateProfile, 'create');

    it("should send 200 when create works", async () => {
      create.mockReturnValue(Promise.resolve(sampleCandidate))
      await request(app).post('/candidateprofile/1')
        .send(sampleBody)
        .expect(200)
        .expect("Content-Type", /json/);
      expect(create).toHaveBeenCalledWith({...sampleBody, accountId:1});

    });

    it("should send 500 when select fails", async () => {
      create.mockImplementation(() => {throw new Error });
      await request(app).post('/candidateprofile/1')
        .expect(500)

    });
  });

  describe("PUT /candidateprofile", () => {

    const update = jest.spyOn(Repository.CandidateProfile, 'update');

    

    it("should send 200 when update works", async () => {
      update.mockReturnValue(Promise.resolve(sampleCandidate));
      await request(app).put('/candidateprofile')
        .send(sampleBody)
        .query({id: 1})
        .expect(200)
        .expect("Content-Type", /json/);
      expect(update).toHaveBeenCalledWith({...sampleBody, id:1});

    });

    it("should send 500 when select fails", async () => {
      update.mockImplementation(() => {throw new Error });
      await request(app).put('/candidateprofile')
        .expect(500)

    });
  });

  describe("DELETE /candidateprofile", () => {

    const remove = jest.spyOn(Repository.CandidateProfile, 'remove').mockReturnValue(Promise.resolve());
    const id = 1;
    it("should send 200 when remove works", async () => {
      await request(app).delete('/candidateprofile')
        .query({ id: id })
        .expect(200);
      expect(remove).toHaveBeenCalledWith({ id: [id] });

    });

    it("should send 500 when remove fails", async () => {
      remove.mockImplementation(() => {throw new Error });
      await request(app).delete('/candidateprofile')
        .expect(500)

    });
  });


});