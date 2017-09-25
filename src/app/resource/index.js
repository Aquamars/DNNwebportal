// API call
import axios from 'axios';
import Papa from 'papaparse';
import api from './api.json';
import ftp from './ftp.json';
import sshweb from './sshweb.json';

// export const DOMAIN = 'http://tarsanad.ddns.net'
// export const PORT = ':9527'
//  export const PORT = ':4321'
export const PORT = ':' + api.port;
// export const PATH = 'web'
// export const API_URL = DOMAIN+':'+PORT+'/'+PATH+'/'
// export const DOMAIN = 'http://54.249.32.121'
// export const DOMAIN = 'http://140.96.29.153'
export const DOMAIN = api.host;
// export const DOMAIN = 'http://localhost'
// export const PATH = 'user/signin'
// export const API_URL = DOMAIN + PORT;
// export const API_SIGNIN = API_URL + '/user/signin';
// export const API_CreateSchedule = API_URL + '/user/schedule/';
// export const API_CheckInstance = API_URL + '/machine/remain';
// export const API_GetCalendar = API_URL + '/machine/calendar/';
// export const API_GetInfo = API_URL + '/user/schedule';
// export const API_DeleteSchedule = API_URL + '/user/schedule/';
// export const API_GetExtDate = API_URL + '/user/schedule/';
// export const API_PutExtDate = API_URL + '/user/schedule/';
// export const API_GetImage = API_URL + '/image/';
// export const API_GetAll = API_URL + '/schedule';
// export const API_GetMachine = API_URL + '/machine/';

export const ApiURL = DOMAIN + PORT;
export const ApiSIGNIN = ApiURL + '/user/signin';
export const ApiCreateSchedule = ApiURL + '/user/schedule/';
export const ApiCheckInstance = ApiURL + '/machine/remain';
export const ApiGetCalendar = ApiURL + '/machine/calendar/';
export const ApiGetInfo = ApiURL + '/user/schedule';
export const ApiDeleteSchedule = ApiURL + '/user/schedule/';
export const ApiGetExtDate = ApiURL + '/user/schedule/';
export const ApiPutExtDate = ApiURL + '/user/schedule/';
export const ApiGetImage = ApiURL + '/image/';
export const ApiGetAll = ApiURL + '/schedule';
export const ApiGetMachine = ApiURL + '/machine/';
// FTP
export const FTPHost = ftp.host;
export const FTPPort = ftp.port;// SshWeb

export const SshWebIP = sshweb.host;
export const SshWebPort = sshweb.port;
export const SshWebHost = SshWebIP + ':' + SshWebPort;
export const SshWebURL = SshWebHost + '/?ssh=ssh://';
// fake data
export const DATA = [
  {
    startTime: '2017-01-02',
    endTime: '2017-05-02',
    instance: 'eeny',
    status: 'running',
    image: 'c2c3152907b5',
    project: 'G352BQ2100',
    account: 'information',
    password: 'research',
    dataSet: false,
    dataSetPath: '',
    dataSetId: '',
    dataSetPass: '',
  },
  {
    startTime: '2017-03-22',
    endTime: '2017-06-26',
    instance: 'meeny',
    status: 'stop',
    image: 'fb434121fc77',
    project: 'G352BQ2100',
    account: 'communications',
    password: 'research',
    dataSet: true,
    dataSetPath: '/var/www/html',
    dataSetId: '123',
    dataSetPass: '123456',
  },
  {
    startTime: '2017-08-08',
    endTime: '2017-09-12',
    instance: 'minyMoe',
    status: 'initial',
    image: '91c95931e552',
    project: 'G352BQ2100',
    account: 'laboratories',
    password: 'research',
    dataSet: false,
    dataSetPath: '',
    dataSetId: '',
    dataSetPass: '',
  },
];

export const projectCodeSet = [
  'G352B12100',
  'G352B1Z11X',
  'G352B8Z41X',
  'G353CH6210',
  'F652RXX900',
  'G352J13200',
  'GM523XX00A',
  'G353CH3100',
  'G352BQ2100',
  'F101WD7200',
  'G301AR2H10',
  'G352B84200',
  'F652RXXA00',
  'F652RXX300',
  'G352BB2310',
  'F652RX3000',
  'G101WD7200',
  'G301AR2P20',
  'G301AA3410',
  'G301AR2A20',
  'F652RX1000',
  'G352B1Z10X',
  'G352B84100',
  'G4521E1112',
];

export const orgProject = [
  // {
  //  unit: '00-工研院',
  //  project:[
  //  // {
  //  //  code: 'G357CP0000',
  //  //  name: '',
  //  //  host: '',
  //  //  hostId: '000100'
  //  // }
  //  ]
  // },
  {
    unit: '01-院部',
    project: [],
  },
  {
    unit: '07-量測',
    project: [],
  },
  {
    unit: '14-行政',
    project: [],
  },
  {
    unit: '17-資科',
    project: [],
  },
  {
    unit: '20-產經',
    project: [],
  },
  {
    unit: '21-會計',
    project: [],
  },
  {
    unit: '23-學院',
    project: [],
  },
  {
    unit: '27-南分院',
    project: [],
  },
  {
    unit: '28-技轉法律',
    project: [],
  },
  {
    unit: '29-國際',
    project: [],
  },
  {
    unit: '30-產服',
    project: [],
  },
  {
    unit: '32-競爭力',
    project: [],
  },
  {
    unit: '51-電光',
    project: [],
  },
  {
    unit: '52-資通',
    project: [],
  },
  {
    unit: '53-機械',
    project: [],
  },
  {
    unit: '54-材化',
    project: [],
  },
  {
    unit: '55-綠能',
    project: [],
  },
  {
    unit: '56-生醫',
    project: [],
  },
  {
    unit: '57-中分院',
    project: [],
  },
  {
    unit: '61-顯示',
    project: [],
  },
  {
    unit: '65-服科',
    project: [],
  },
  {
    unit: '67-巨資',
    project: [],
  },
  {
    unit: '68-智慧機械',
    project: [],
  },
  {
    unit: '69-微系統',
    project: [],
  },
  {
    unit: '70-雷射',
    project: [],
  },
];

function filterProject(data, num) {
  const re = new RegExp('^' + num);
  return data.filter(obj => (obj.departmentProfit.match(re)));
}
function readFile(OrgProject) {
  let data = [];
  const csvfile = './res/projectcode.csv';
  let all = OrgProject;
  Papa.parse(csvfile, {
    download: true,
    encoding: 'utf-8',
    header: true,
    complete: (results) => {
      data = results.data;
      let projectAryAll = [];
      OrgProject.map((project, index) => {
        const dep = project.unit.split('-');
        let temp = filterProject(data, dep[0]);
        let projectAry = [];
        // console.log(temp)
        temp.map((obj) => {
          let saveObj = {};
          saveObj.label = obj.pjCode + ' ' + obj.host + ' ' + obj.pjName;
          saveObj.value = obj.pjCode + ',' + obj.host;
          projectAry.push(saveObj);
          projectAryAll.push(saveObj);
          return 0;
        });
        all[index].project = projectAry;
        return results;
        // console.log(all[index].project)
      });
    },
  });
  return all;
}
export const getInfo = async (token, mode) => {
  const result = await axios
  .get(ApiGetInfo, {
    headers: { 'X-Access-Token': token, Accepts: 'application/json' },
    params: { mode },
  })
  .then(res => res)
  .catch(err => err);
  return result;
};

export const getschedule = async (years) => {
  let data = {};
  for (let i = 1; i < 13; i += 1) {
    let key = years + '-' + i;
    data[key] = 0;
    if (i === 12) {
      const sheduleData = await axios
        .get(ApiGetAll, {
          headers: { Accept: 'application/json' },
          params: { start: key + '-1', end: key + '-31' },
        })
        .then(res => res)
        .catch(err => err);
      data[key] = sheduleData.data.length;
    } else {
      const sheduleData = await axios
        .get(ApiGetAll, {
          headers: { Accept: 'application/json' },
          params: { start: key, end: years + '-' + (i + 1) },
        })
        .then(res => res)
        .catch(err => err);
      data[key] = sheduleData.data.length;
    }
  }
  // console.log(data)
  return data;
};

export const project2017 = readFile(orgProject);

export const machineStatusData = {
  running: 60,
  stop: 20,
};

export const instancesStatusData = {
  running: 15,
  stop: 4,
};

export const instancesMonthlyUsed = {
  '2016-12': 2,
  '2017-1': 13,
  '2017-2': 8,
  '2017-3': 12,
  '2017-4': 23,
  '2017-5': 18,
  '2017-6': 29,
};

export const imageTotalUsed = {
  japripark: 199,
  jojo: 97,
  JigokuShoujo: 127,
  konosuba: 176,
};

export const imageMonthlyUsed = {
  japripark: {
    '2017-3': 32,
    '2017-4': 33,
    '2017-5': 58,
    '2017-6': 19,
  },
  jojo: {
    '2017-3': 8,
    '2017-4': 4,
    '2017-5': 1,
    '2017-6': 3,
  },
  JigokuShoujo: {
    '2017-3': 24,
    '2017-4': 24,
    '2017-5': 21,
    '2017-6': 13,
  },
  konosuba: {
    '2017-3': 24,
    '2017-4': 45,
    '2017-5': 11,
    '2017-6': 23,
  },
};

export const instanceUsing = {
  instanceUse: {
    '2017-3': 102,
    '2017-4': 230,
    '2017-5': 158,
    '2017-6': 179,
  },
};

// export const machineToInstance = {
//   machines: [
//     {
//       machineId: 'm1',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         },
//       ],
//     },
//     {
//       machineId: 'm2',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm3',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         },
//       ],
//     },
//     {
//       machineId: 'm4',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm5',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         },
//       ],
//     },
//     {
//       machineId: 'm6',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         },
//       ],
//     },
//     {
//       machineId: 'm7',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         },
//       ],
//     },
//     {
//       machineId: 'm8',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm9',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm10',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm11',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm12',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm13',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm14',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm15',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm16',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm17',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm18',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm19',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm20',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm21',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm22',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm23',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         }
//       ]
//     },
//     {
//       machineId: 'm24',
//       instances: [
//         {
//           instanceId: 1,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 2,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-6-12',
//           ended_at: '2017-8-29',
//         },
//         {
//           instanceId: 3,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-5-12',
//           ended_at: '2017-7-29',
//         },
//         {
//           instanceId: 4,
//           intanceStatusId: 0,
//           itri_id: 'xx',
//           started_at: '2017-3-12',
//           ended_at: '2017-12-29',
//         },
//       ],
//     },
//   ],
// };
