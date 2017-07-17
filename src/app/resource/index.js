// export const DOMAIN = 'http://tarsanad.ddns.net'
// export const PORT = '9527'
// export const PATH = 'web'
// export const API_URL = DOMAIN+':'+PORT+'/'+PATH+'/'
export const DOMAIN = 'http://54.249.32.121'
export const API_SIGNIN = DOMAIN + '/user/signin'
export const PATH = 'user/signin'
export const API_URL = DOMAIN + '/'+PATH
export const API_CreateSchedule = DOMAIN + '/user/schedule/'
export const API_CheckInstance = DOMAIN + '/machine/remain'
export const API_GetCalendar = DOMAIN + '/machine/calendar/'
export const API_GetInfo = DOMAIN + '/user/schedule'
export const API_DeleteSchedule = DOMAIN + '/user/schedule/'
export const API_GetExtDate = DOMAIN + '/user/schedule/'
export const API_PutExtDate = DOMAIN + '/user/schedule/'
export const API_GetImage = DOMAIN + '/image/'
export const API_GetAll = DOMAIN + '/schedule/'
export const API_GetMachine = DOMAIN + '/machine/'
// fake data
export const DATA = [
{startTime:'2017-01-02',endTime:'2017-05-02', instance:'eeny', status:'running', image:'c2c3152907b5', project:'G352BQ2100', account:'information', password:'research', dataSet:false, dataSetPath:'', dataSetId:'', dataSetPass:''},
{startTime:'2017-03-22',endTime:'2017-06-26', instance:'meeny', status:'stop', image:'fb434121fc77', project:'G352BQ2100', account:'communications', password:'research', dataSet:true, dataSetPath:'/var/www/html', dataSetId:'123', dataSetPass:'123456'},
{startTime:'2017-08-08',endTime:'2017-09-12', instance:'minyMoe', status:'initial', image:'91c95931e552', project:'G352BQ2100', account:'laboratories', password:'research', dataSet:false, dataSetPath:'', dataSetId:'', dataSetPass:''},
]

export const projectCodeSet = ['G352B12100','G352B1Z11X','G352B8Z41X','G353CH6210','F652RXX900','G352J13200','GM523XX00A','G353CH3100','G352BQ2100','F101WD7200','G301AR2H10','G352B84200','F652RXXA00','F652RXX300','G352BB2310','F652RX3000','G101WD7200','G301AR2P20','G301AA3410','G301AR2A20','F652RX1000','G352B1Z10X','G352B84100','G4521E1112']

export let orgProject = [
  // {
  // 	unit: "00-工研院",
  // 	project:[
  // 				// {
  // 				// 	code: "G357CP0000",
  // 				// 	name: "",
  // 				// 	host: "",
  // 				// 	hostId: "000100"		        
  // 				// }
  // 		]
  // },
  {
  	unit: "01-院部",
  	project:[]
  },
  {
  	unit: "07-量測",
  	project:[]
  },
  {
  	unit: "14-行政",
  	project:[]
  },
  {
  	unit: "17-資科",
  	project:[]
  },
  {
  	unit: "20-產經",
  	project:[]
  },
  {
  	unit: "21-會計",
  	project:[]
  },
  {
  	unit: "23-學院",
  	project:[]
  },
  {
  	unit: "27-南分院",
  	project:[]
  },
  {
  	unit: "28-技轉法律",
  	project:[]
  },
  {
  	unit: "29-國際",
  	project:[]
  },
  {
  	unit: "30-產服",
  	project:[]
  },
  {
  	unit: "32-競爭力",
  	project:[]
  },
  {
  	unit: "51-電光",
  	project:[]
  },
  {
  	unit: "52-資通",
  	project:[]
  },
  {
  	unit: "53-機械",
  	project:[]
  },
  {
  	unit: "54-材化",
  	project:[]
  },
  {
  	unit: "55-綠能",
  	project:[]
  },
  {
  	unit: "56-生醫",
  	project:[]
  },
  {
  	unit: "57-中分院",
  	project:[]
  },
  {
  	unit: "61-顯示",
  	project:[]
  },
  {
  	unit: "65-服科",
  	project:[]
  },
  {
  	unit: "67-巨資",
  	project:[]
  },
  {
  	unit: "68-智慧機械",
  	project:[]
  },
  {
  	unit: "69-微系統",
  	project:[]
  },
  {
  	unit: "70-雷射",
  	project:[]
  }
]
export const project2017 = readFile(orgProject)
import Papa from 'papaparse'
function filterProject(data, num) {
  let re = new RegExp("^"+num)
  return data.filter(function(obj) {
    return obj.departmentProfit.match(re)
  }) 
}

function readFile (orgProject){
  let data = []
  let csvfile = "./res/projectcode.csv"
  let all = orgProject
  Papa.parse(csvfile, {
      download: true,
      encoding: "utf-8",
      header: true,
      complete: function(results) {
        data = results.data
        let projectAryAll = []
        orgProject.map((project, index)=>{
          const dep = project.unit.split('-')
          let temp = filterProject(data, dep[0])
          let projectAry = []          
          temp.map(function(obj){
            let saveObj = {}
            saveObj.label = obj.pjCode +" "+ obj.host +" "+ obj.pjName
            saveObj.value = obj.pjCode +","+ obj.host
            projectAry.push(saveObj)
            projectAryAll.push(saveObj)
          })
          all[index].project = projectAry
          // console.log(all[index].project)
        })
      }
  })  
  return all
}
export const machineStatusData = {
  running:60,
  stop:20,
}

export const instancesStatusData = {
  running:15,
  stop:4,
}

export const instancesMonthlyUsed = {
  '2016-12':2,
  '2017-1':13,
  '2017-2':8,
  '2017-3':12,
  '2017-4':23,
  '2017-5':18,
  '2017-6':29,
}

export const imageTotalUsed = {
  'japripark': 199,
  'jojo': 97,
  'JigokuShoujo': 127,
  'konosuba': 176,
}

export const imageMonthlyUsed = {
  japripark:{
    '2017-3':32,
    '2017-4':33,
    '2017-5':58,
    '2017-6':19,
  },
  jojo:{
    '2017-3':8,
    '2017-4':4,
    '2017-5':1,
    '2017-6':3,
  },
  JigokuShoujo:{
    '2017-3':24,
    '2017-4':24,
    '2017-5':21,
    '2017-6':13,
  },
  konosuba:{
    '2017-3':24,
    '2017-4':45,
    '2017-5':11,
    '2017-6':23,
  },
}

export const instanceUsing = {
  instanceUse:{
    '2017-3':102,
    '2017-4':230,
    '2017-5':158,
    '2017-6':179,
  },
}

export const machineToInstance = {
  machines:[
    {
      'machineId':'m1',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m2',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m3',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m4',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m5',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m6',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m7',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m8',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m9',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m10',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m11',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m12',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m13',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m14',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m15',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m16',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m17',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m18',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m19',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m20',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m21',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m22',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m23',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    },
    {
      'machineId':'m24',
      instances:[
        {
          instanceId:1,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:2,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-6-12',
          ended_at:'2017-8-29'
        },
        {
          instanceId:3,           
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-5-12',
          ended_at:'2017-7-29'
        },
        {
          instanceId:4,   
          intanceStatusId:0,
          itri_id:'xx',
          started_at:'2017-3-12',
          ended_at:'2017-12-29'
        }
      ]
    }
  ]     
}