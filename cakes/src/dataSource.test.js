import DataSource from './dataSource'
import sinon from 'sinon';

let requests =[];
let xhr;

beforeEach(() => {
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate =  (xhr) => {
        requests.push(xhr);
    };
});

afterEach(()=> {
    xhr.restore();
});

it('should make call', ()=> {
    DataSource.getData();
    expect(requests.length).toBe(1);
});

it('should return expected data', () => {
    var callback = sinon.spy();

    DataSource.getData(callback);

    requests[0].respond(200, { 'Content-Type': 'text/plain'}, '[{ "title": "Lemon cheesecake", "desc": "A cheesecake made of lemon", "image":"lemoncake_lg.jpg" }]');

    expect(callback.calledWith([{ 'title': 'Lemon cheesecake', 'desc': 'A cheesecake made of lemon', 'image':'lemoncake_lg.jpg' }])).toBeTruthy();
});