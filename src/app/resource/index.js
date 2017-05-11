// export const DOMAIN = 'http://tarsanad.ddns.net'
// export const PORT = '9527'
// export const PATH = 'web'
// export const API_URL = DOMAIN+':'+PORT+'/'+PATH+'/'
export const DOMAIN = 'http://54.249.32.121'
export const API_SIGNIN = DOMAIN+'/user/signin'
export const PATH = 'user/signin'
export const API_URL = DOMAIN+'/'+PATH
export const API_CheckInstance = DOMAIN+'/'+'machine/remain'
export const API_GetCalendar = DOMAIN+'/machine/calendar/'
export const API_GetInfo = DOMAIN+'/user/schedule'
export const API_DeleteSchedule = DOMAIN+'/machine/calendar/'
export const API_GetExtDate= DOMAIN+'/user/schedule/'
export const API_PutExtDate= DOMAIN+'/user/schedule/'
// fake data
export const DATA = [
{startTime:'2017-01-02',endTime:'2017-05-02', instance:'eeny', status:'running', image:'c2c3152907b5', project:'G352BQ2100', account:'information', password:'research', dataSet:false, dataSetPath:'', dataSetId:'', dataSetPass:''},
{startTime:'2017-03-22',endTime:'2017-06-26', instance:'meeny', status:'stop', image:'fb434121fc77', project:'G352BQ2100', account:'communications', password:'research', dataSet:true, dataSetPath:'/var/www/html', dataSetId:'123', dataSetPass:'123456'},
{startTime:'2017-08-08',endTime:'2017-09-12', instance:'minyMoe', status:'initial', image:'91c95931e552', project:'G352BQ2100', account:'laboratories', password:'research', dataSet:false, dataSetPath:'', dataSetId:'', dataSetPass:''},
]