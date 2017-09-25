// import pdfConverter from 'jspdf'
import pdfMake from 'pdfmake/build/pdfmake.js';
import vfsFonts from '../plugin/font/vfs_fonts';
import { ftpPass } from './FtpPass';
import { FTPHost, FTPPort } from '../resource';
// image
import {
  monkey,
  logo,
  logoTc,
  ftp,
  ftp2,
  webCreate1,
  webCreate2,
  webCreate3,
  webCreate4,
  webCreate5,
  webCreate6,
  webCreate7,
  accessInstance1,
  accessInstance2,
  accessInstance3,
  accessInstance4,
  accessInstance5,
  accessInstance6,
  tensorflow,
  tensorflow2,
  tensorflow3,
  header,
} from '../image/imageBase64';
// import {

// } from '../image'

// import '../plugin/html2Canvas'
export function displayPDF(username, language) {
  const ftpPassword = ftpPass(username);
  const docDefinition = {
    content: [
// page 1
      {
        text: 'Even monkey can use DNN',
        style: 'title',
        fontSize: 36,
      },
      {
        text: '\n\n\n\n\n\n\n',
      },
      {
        image: monkey,
        width: 450,
      },
      {
        text: '\n\n\n\n\n\n\n',
      },
      {
        text: 'Author:\n Professional Monkey',
        alignment: 'center',
        fontSize: 24,
      },
      {
        text: '\nmOnkEyuSEr@itri.org.tw',
        alignment: 'center',
        fontSize: 20,
      },
      {
        text: '\n\n\n\n\n',
      },
      {
        image: logo,
        width: 200,
        alignment: 'center',
        pageBreak: 'after',
      },
// page 2
      {
        text: 'Guideline',
        style: 'title',
        fontSize: 36,
      },
      {
        text: '\n',
      },
      {
        ol: [
          {
            text: 'How to use FTP\n',
            linkToPage: 3,
            style: 'outline',
          },
          {
            text: 'How to create instance on webportal\n',
            linkToPage: 4,
            style: 'outline',
          },
          {
            text: 'Accessing your instance\n',
            linkToPage: 8,
            style: 'outline',
          },
          {
            ul: [
              {
                text: 'Using putty access instance on your PC\n',
                linkToPage: 8,
              },
              {
                text: 'Using linux to access instance\n',
                linkToPage: 9,
              },
              {
                text: 'Using SSH web to access instance\n',
                linkToPage: 10,
              },
            ],
            fontSize: 22,
          },
          {
            text: 'Demo of Tensorflow running code\n',
            linkToPage: 12,
            style: 'outline',
          },
          {
            text: 'TensorAPM\n',
            linkToPage: 15,
            style: 'outline',
          },
        ],
        fontSize: 24,
        pageBreak: 'after',
      },
// page 3
      {
        text: 'How to use FTP',
        style: 'title',
      },
      {
        text: '\n\n',
      },
      {
        text: 'You can use FTP to upload dataset or image(s). \n ',
        fontSize: 20,
      },
      {
        text: '\n\n',
      },
      {
        text: 'These are your FTP connect information.',
        fontSize: 18,
      },
      {
        style: 'tableExample',
        table: {
          widths: [200, '*', 100, '*'],
          body: [
            ['ftpHost', 'ftpUser', 'ftpPass', 'ftpPort'],
            [
              {
                text: FTPHost,
                bold: true,
              },
              {
                text: username,
                bold: true,
              },
              {
                text: ftpPassword,
                bold: true,
              },
              {
                text: FTPPort,
                bold: true,
              },
            ],
          ],
        },
      },
      {
        image: ftp,
        width: 550,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text: 'You can find FTP information on webportal',
        fontSize: 18,
      },
      {
        image: ftp2,
        width: 550,
        alignment: 'center',
        pageBreak: 'after',
      },
// page 4
      {
        text: 'How to create instance on webportal',
        style: 'title',
      },
      {
        text: '\n\n',
      },
      {
        text: 'You may create up to 3 instances.',
        color: 'red',
        fontSize: 20,
      },
      {
        text: '\n\n',
      },
      {
        text: '1. Click +create button.',
        fontSize: 16,
      },
      {
        image: webCreate1,
        width: 500,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text: '2. Choose the date range.',
        fontSize: 16,
      },
      {
        image: webCreate2,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text:
          '3. Interval needs to be larger than 0 days to go to the next step.',
        fontSize: 16,
      },
      {
        image: webCreate3,
        width: 500,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text: '4. You can choose the image(s) you want.',
        fontSize: 16,
      },
      {
        image: webCreate4,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text: '5. Create instance after confirming your settings.',
        fontSize: 16,
      },
      {
        image: webCreate5,
        width: 500,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text:
          '6. You will get your account and password after instance is created successfully.',
        fontSize: 16,
      },
      {
        image: webCreate6,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text:
          '7. You can see the instance IP& port after instance status becomes running.',
        fontSize: 16,
      },
      {
        image: webCreate7,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
// page 8
      {
        text: 'Access instance',
        style: 'title',
      },
      {
        text: '\n\n',
      },
      {
        text: '1. Using putty access instance on your PC.',
        fontSize: 18,
        bold: true,
      },
      {
        text: 'Input your ip & port and select SSH.(you can click to copy&paste)',
        fontSize: 16,
      },
      {
        image: accessInstance1,
        width: 500,
        alignment: 'center',
      },
      {
        text: 'Input your account name and password to access instance.',
        fontSize: 16,
      },
      {
        image: accessInstance2,
        width: 260,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text: '2. Using linux to access instance.',
        fontSize: 18,
        bold: true,
      },
      {
        text: 'Click to copy and paste the command lines.',
        fontSize: 16,
      },
      {
        image: accessInstance3,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text: '3. Using SSH web to access instance.',
        fontSize: 18,
        bold: true,
        font: 'tc',
      },
      {
        text: 'Click the “SSH WEB” button to open a new page.',
        fontSize: 16,
        font: 'tc',
      },
      {
        text: 'Login for the first time, please type “yes”.',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: accessInstance4,
        width: 500,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text: 'Copy and paste the SSH Password (Click to copy).',
        fontSize: 16,
        font: 'tc',
      },
      {
        text: '',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: accessInstance5,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text: '\n\n',
      },
      {
        text: 'Schedule ID is shown on URL or on the page title.',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: accessInstance6,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
// page 10
      {
        text: 'Demo of Tensorflow running code',
        style: 'title',
      },
      {
        text: '\n\n',
      },
      {
        text:
          'Example of running code with dataset are located in image tensorflow:201707. ',
        fontSize: 18,
        alignment: 'justify',
      },
      {
        text: '\n',
      },
      {
        text: [
          'Training file is located in ',
          {
            text: '“/” directory',
            color: 'blue',
          },
          ' and named ',
          {
            text: 'demo.py',
            color: 'blue',
          },
          '.\n',
          'Dataset is located in ',
          {
            text: '“/tmp/data”',
            color: 'blue',
          },
          '.',
        ],
        fontSize: 18,
      },
      {
        text: [
          'Use command: “ ',
          {
            text: 'python /demo.py',
            color: 'green',
          },
          ' ” to run this sample code.',
        ],
        fontSize: 18,
      },
      {
        text: '\n',
      },
      {
        table: {
          widths: [150, 300],
          body: [
            ['training file', 'dataset archives'],
            [
              {
                ul: ['demo.py'],
              },
              {
                ul: [
                  't10k-labels-idx1-ubyte.gz',
                  't10k-images-idx3-ubyte.gz',
                  'train-images-idx3-ubyte.gz',
                  'train-labels-idx1-ubyte.gz',
                ],
              },
            ],
          ],
        },
        fontSize: 16,
      },
      {
        text: '\n',
      },
      {
        text: [
          'This code main purpose is to demo that Tensorflow can successfully run in the image and train a simple model.\n\n',
          'This example takes a MNIST dataset as an input. Tensorboard and command line logs are generated as output. Command line output shows a cost function values during training. Tensorboard logs are saved to a specified folder.\n',
        ],
        fontSize: 18,
        alignment: 'justify',
      },
      {
        text: '\n',
      },
      {
        text: 'Parameters specification:\n',
        fontSize: 18,
      },
      {
        image: tensorflow,
        width: 500,
        pageBreak: 'after',
      },
      {
        table: {
          widths: [150, 350],
          body: [
            ['Parameters ', 'Description'],
            [
              'mnist',
              'location of dataset files specified here. Currently it is set to “/tmp/data”, can be changed. If there is no dataset in specified folder it will be downloaded automatically.',
            ],
            ['learning_rate', 'initial learning rate'],
            [
              'training_epochs',
              ' number of epoch. One epoch is finished when all images from dataset were feed to network once.',
            ],
            ['batch_size', 'number of images to feed to network each time.'],
            ['display_step', 'how often display progress'],
            ['logs_path', 'path where Tensorboard logs will be saved.'],
          ],
        },
        fontSize: 14,
        alignment: 'justify',
      },
      {
        text: '\n',
      },
      {
        text: 'Correct output should look like this:\n',
        fontSize: 18,
      },
      {
        image: tensorflow2,
        width: 250,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text:
          'If Tensorflow is configured to run on gpu and has access to gpu it will tell what gpus were found:',
        fontSize: 18,
      },
      {
        image: tensorflow3,
        width: 500,
      },
      {
        text: '\n',
      },
      {
        text:
          'This code can run on both cpu and gpu depending on what type of Tensorflow was installed and what devices are visible. If gpu version of Tensorflow installed and gpu is visible for this code by default training will run on gpu.',
        fontSize: 18,
        alignment: 'justify',
        pageBreak: 'after',
      },
// page 13
      {
        text: 'TensorAPM',
        style: 'title',
      },
      {
        text: '\n\n',
      },
      {
        text: 'Guide',
        fontSize: 24,
        bold: true,
      },
      {
        text: '\n',
      },
      {
        text: 'Step-1 : Check items before running script',
        fontSize: 20,
      },
      {
        type: 'none',
        ol: [
          'check ftp command',
          {
            type: 'none',
            ol: ['$ which ftp', '/usr/bin/ftp'],
          },
        ],
      },
      {
        type: 'none',
        ol: [
          'check /tmp mode is 777',
          {
            type: 'none',
            ol: [
              '$ ls -ld /tmp',
              'drwxrwxrwt 13 root root 4096 Aug 31 07:58 /tmp',
            ],
          },
        ],
      },
      {
        text: '\n',
      },
      {
        text: 'Step-2 : Run script and obtain URL',
        fontSize: 20,
      },
      {
        type: 'none',
        ol: [
          '$ /utils/uptf.sh <eventlog-path>',
          'for example:',
          {
            type: 'none',
            ol: [
              'A50562@m4:~$ /utils/uptf.sh /tmp/tensorflow_logs/',
              '--- TensorAPM ---',
              ' INFO[TensorAPM]: Valid User Name: A50562, IP: 100.86.2.10',
              'INFO[TensorAPM]: confirm upload',
              'INFO[TensorAPM]: APM is running at :',
              'http://140.96.27.123:8080/ITRIOpenAPM/index.jsp?apiProvider=1&dnnID=12345',
            ],
          },
        ],
      },
      {
        text: '\n',
      },
      {
        text: 'Step-3 : Browse to TensorAPM',
        fontSize: 20,
      },
      {
        type: 'none',
        ol: [
          'for example:',
          {
            type: 'none',
            ol: [
              'http://140.96.27.123:8080/ITRIOpenAPM/index.jsp?apiProvider=1&dnnID=12345',
            ],
          },
        ],
      },
      {
        text: '\n\n',
      },
      {
        text: 'Specifications',
        fontSize: 24,
        bold: true,
      },
      {
        text: '\n',
      },
      {
        ul: [
          'Users run script to upload event logs and obtain an URL to browse to TensorAPM. (details described in User Guide)',
          'Every user will obtain a dedicated instance of TensorAPM, all instances will be isolated by IP port.',
          'All graphs for same user+container IP address are grouped as drop-down items in same TensorAPM.',
          'Once user changes relative to a given container IP address, the TensorAPM instance created for the previous user will be flushed.',
        ],
        alignment: 'justify',
      },
    ],
// PDF footer
    footer: (currentPage, pageCount) => {
      return currentPage !== 1
        ? {
          stack: [
            { text: currentPage, alignment: 'center', fontSize: 10 },
            {
              text:
                '© 2017 Industrial Technology Research Institute.                                                                          BackToGuideline',
              alignment: 'right',
              fontSize: 8,
              linkToPage: 2,
              margin: 2,
            },
              // {text:'BackToGuideline', alignment: 'right',fontSize:8, linkToPage: 2, margin: 2,},
              { image: header, width: 600, alignment: 'center' },
          ],
        }
        : {
          stack: [
              // {text:'\n' , alignment: 'center', fontSize:10},
            {
              text: '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
              alignment: 'center',
              fontSize: 1,
            },
              // {text:'© 2017 Industrial Technology Research Institute.                                                                          BackToGuideline', alignment: 'right', fontSize:8 ,linkToPage: 2, margin: 2},
              // {text:'BackToGuideline', alignment: 'right',fontSize:8, linkToPage: 2, margin: 2,},
              { image: header, height: 15, width: 600, alignment: 'center' },
          ],
        };
    },
// PDF header
    header: (currentPage, pageCount) => {
      return {
        image: header,
        width: 600,
        alignment: 'center',
      };
    },
// PDF styles
    styles: {
      title: {
        fontSize: 30,
        bold: true,
        alignment: 'center',
      },
      outline: {
        fontSize: 24,
        margin: [0, 15],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
        alignment: 'center',
      },
    },
  };
  const docDefinitionTC = {
    content: [
// page 1
      {
        text: '猴子也會用的 DNN',
        style: 'title',
        fontSize: 36,
      },
      {
        text: '\n\n\n\n\n\n\n',
      },
      {
        image: monkey,
        width: 450,
      },
      {
        text: '\n\n\n\n\n\n\n',
      },
      {
        text: '作者:\n Professional Monkey',
        alignment: 'center',
        fontSize: 24,
        font: 'tc',
      },
      {
        text: '\nmOnkEyuSEr@itri.org.tw',
        alignment: 'center',
        fontSize: 20,
      },
      {
        text: '\n\n\n\n\n',
      },
      {
        image: logoTc,
        width: 200,
        alignment: 'center',
        pageBreak: 'after',
      },
// page 2
      {
        text: '使用者指南',
        style: 'title',
        fontSize: 36,
      },
      {
        text: '\n',
      },
      {
        ol: [
          {
            text: '如何使用FTP\n',
            linkToPage: 3,
            style: 'outline',
          },
          {
            text: '透過Web啟用Instance\n',
            linkToPage: 4,
            style: 'outline',
          },
          {
            text: '登入Instance\n',
            linkToPage: 8,
            style: 'outline',
          },
          {
            ul: [
              {
                text: '使用 putty 登入 instance\n',
                linkToPage: 8,
              },
              {
                text: '使用 linux 系統登入Instance\n',
                linkToPage: 9,
              },
              {
                text: '使用 SSH web 登入Instance\n',
                linkToPage: 10,
              },
            ],
            fontSize: 22,
            style: 'outline',
          },
          {
            text: 'Tensorflow測試範例\n',
            linkToPage: 12,
            style: 'outline',
          },
          {
            text: 'TensorAPM用戶指南\n',
            linkToPage: 15,
            style: 'outline',
          },
        ],
        fontSize: 24,
        pageBreak: 'after',
      },
// page 3
      {
        text: '如何使用FTP',
        style: 'title',
      },
      {
        text: '\n\n',
      },
      {
        text: '您可以利用 FTP上傳您的 dataset 或是 image。',
        fontSize: 20,
        font: 'tc',
      },
      {
        text: '\n\n',
      },
      {
        text: '這些是您的FPT連線資訊。',
        fontSize: 18,
        font: 'tc',
      },
      {
        style: 'tableExample',
        table: {
          widths: [200, '*', 100, '*'],
          body: [
            ['ftpHost', 'ftpUser', 'ftpPass', 'ftpPort'],
            [
              {
                text: FTPHost,
                bold: true,
              },
              {
                text: username,
                bold: true,
              },
              {
                text: ftpPassword,
                bold: true,
              },
              {
                text: FTPPort,
                bold: true,
              },
            ],
          ],
        },
      },
      {
        image: ftp,
        width: 550,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text: '您也可以從Web上找到FTP連線資訊喔~吱吱',
        fontSize: 18,
        font: 'tc',
      },
      {
        image: ftp2,
        width: 550,
        alignment: 'center',
        pageBreak: 'after',
      },
// page 4
      {
        text: '透過Web啟用Instance',
        style: 'title',
      },
      {
        text: '\n\n',
      },
      {
        text: '*每人最多只能預約3個instance。',
        color: 'red',
        fontSize: 20,
        font: 'tc',
      },
      {
        text: '\n\n',
      },
      {
        text: '1. 點擊 建立 按鈕。',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: webCreate1,
        width: 500,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text: '2. 選擇日期的範圍。',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: webCreate2,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text: '3. 日期區間需要大於0，方可進入下一個步驟。',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: webCreate3,
        width: 500,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text: '4. 您可以選擇各種的image來使用。',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: webCreate4,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text: '5. 選擇完後請確認您的設定。',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: webCreate5,
        width: 500,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text: '6. 在建立完Schedule之後，即可得到登入帳號與密碼。',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: webCreate6,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text: '7. 在Instance完成運作之後，即可得到登入IP及port。',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: webCreate7,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
// page 8
      {
        text: '登入instance',
        style: 'title',
      },
      {
        text: '\n\n',
      },
      {
        text: '1. 使用 putty 登入 instance。',
        fontSize: 18,
        bold: true,
        font: 'tc',
      },
      {
        text: '輸入Instance的IP和port，選擇SSH. (您可以直接點擊來複製資訊)',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: accessInstance1,
        width: 450,
        alignment: 'center',
      },
      {
        text: '輸入您的帳號與密碼來登入您的Instance。',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: accessInstance2,
        width: 260,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text: '2. 使用 linux 系統登入Instance。',
        fontSize: 18,
        bold: true,
        font: 'tc',
      },
      {
        text: '只需要點擊即可複製指令，然後貼上指令執行。',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: accessInstance3,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text: '3. 使用 SSH web 登入Instance。',
        fontSize: 18,
        bold: true,
        font: 'tc',
      },
      {
        text: '只需要點擊SSH WEB按鈕，開啟新頁面。',
        fontSize: 16,
        font: 'tc',
      },
      {
        text: '第一次登入需要輸入"yes。',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: accessInstance4,
        width: 500,
        alignment: 'center',
      },
      {
        text: '\n\n',
      },
      {
        text: '複製表格上的密碼(點擊即可複製)。',
        fontSize: 16,
        font: 'tc',
      },
      {
        text: '',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: accessInstance5,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text: '\n\n',
      },
      {
        text: '在網址列或是標題可以得知Schedule ID。',
        fontSize: 16,
        font: 'tc',
      },
      {
        image: accessInstance6,
        width: 500,
        alignment: 'center',
        pageBreak: 'after',
      },
// page 10
      {
        text: 'Tensorflow測試範例',
        style: 'title',
      },
      {
        text: '\n\n',
      },
      {
        text: '測試程式與數據都在tensorflow:201707這個image裡。',
        fontSize: 18,
        alignment: 'justify',
        font: 'tc',
      },
      {
        text: '\n',
      },
      {
        text: [
          '測試程式為',
          {
            text: 'demo.py',
            color: 'blue',
          },
          '，位於',
          {
            text: '“/”資料夾',
            color: 'blue',
          },
          // '.\n',
          '裡，數據則位於',
          {
            text: '“/tmp/data”',
            color: 'blue',
          },
          '。',
        ],
        fontSize: 18,
        font: 'tc',
      },
      {
        text: [
          '輸入指令“ ',
          {
            text: 'python /demo.py',
            color: 'green',
          },
          ' ”開始測試。',
        ],
        fontSize: 18,
        font: 'tc',
      },
      {
        text: '\n',
      },
      {
        table: {
          widths: [150, 300],
          body: [
            ['測試程式', '數據'],
            [
              {
                ul: ['demo.py'],
              },
              {
                ul: [
                  't10k-labels-idx1-ubyte.gz',
                  't10k-images-idx3-ubyte.gz',
                  'train-images-idx3-ubyte.gz',
                  'train-labels-idx1-ubyte.gz',
                ],
              },
            ],
          ],
        },
        fontSize: 16,
        font: 'tc',
      },
      {
        text: '\n',
      },
      {
        text: [
          '這個測試主要的目的是藉由訓練一個簡單的模型，來確定image能否正常運作Tensorflow。\n\n',
          '測試程式處理的是MNIST數據，我們可以從文字介面或者透過Tensorboard看到結果。文字介面會顯示訓練時目標函數的變化，Tensorboard的結果會存在測試程式裡設定的資料夾內。\n',
        ],
        fontSize: 18,
        alignment: 'justify',
        font: 'tc',
      },
      {
        text: '\n',
      },
      {
        text: '參數設定：\n',
        fontSize: 18,
        font: 'tc',
      },
      {
        image: tensorflow,
        width: 500,
        pageBreak: 'after',
      },
      {
        table: {
          widths: [150, 350],
          body: [
            ['參數', '描述'],
            ['mnist', '數據的位置，預設值為“/tmp/data”，也可以改為其他位置，如果程式找不到檔案則會自動從網路下載'],
            ['learning_rate', '初始的學習速率'],
            ['training_epochs', '訓練的迴圈數目，一個迴圈表示模型已經跑過完整一次數據'],
            ['batch_size', '表示模型一步跑幾筆數據'],
            ['display_step', '模型每跑幾步才顯示訓練過程'],
            ['logs_path', 'Tensorboard的結果存放位置'],
          ],
        },
        fontSize: 14,
        alignment: 'justify',
        font: 'tc',
      },
      {
        text: '\n',
      },
      {
        text: '正確的輸出如下：\n',
        fontSize: 18,
        font: 'tc',
      },
      {
        image: tensorflow2,
        width: 250,
        alignment: 'center',
        pageBreak: 'after',
      },
      {
        text: '若使用gpu版本的Tensorflow，會顯示出可用的gpu。',
        fontSize: 18,
        font: 'tc',
      },
      {
        image: tensorflow3,
        width: 500,
      },
      {
        text: '\n',
      },
      {
        text:
          '這個測試程式可以在cpu及gpu上執行，若是使用gpu版本的Tensorflow並且機器上有gpu可用，則預設是使用gpu計算。',
        fontSize: 18,
        font: 'tc',
        alignment: 'justify',
        pageBreak: 'after',
      },
// page 13
      {
        text: 'TensorAPM用戶指南',
        style: 'title',
      },
      {
        text: '\n\n',
      },
      {
        text: '版本 : 0.1.0',
        fontSize: 24,
        font: 'tc',
        bold: true,
      },
      {
        text: '\n',
      },
      {
        text: '步驟一 : 事先檢查項目',
        fontSize: 20,
        font: 'tc',
      },
      {
        type: 'none',
        ol: [
          '檢查ftp 指令',
          {
            type: 'none',
            ol: ['$ which ftp', '/usr/bin/ftp'],
          },
        ],
        font: 'tc',
      },
      {
        type: 'none',
        ol: [
          '檢查/tmp目錄mode值為777',
          {
            type: 'none',
            ol: [
              '$ ls -ld /tmp',
              'drwxrwxrwt 13 root root 4096 Aug 31 07:58 /tmp',
            ],
          },
        ],
        font: 'tc',
      },
      {
        text: '\n',
      },
      {
        text: '步驟二 : 執行指令並取得URL',
        fontSize: 20,
        font: 'tc',
      },
      {
        type: 'none',
        ol: [
          '$ /utils/uptf.sh <eventlog-path>',
          '例如:',
          {
            type: 'none',
            ol: [
              'A50562@m4:~$ /utils/uptf.sh /tmp/tensorflow_logs/',
              '--- TensorAPM ---',
              'INFO[TensorAPM]: Valid User Name: A50562, IP: 100.86.2.10',
              'INFO[TensorAPM]: confirm upload',
              'INFO[TensorAPM]: APM is running at :',
              'http://140.96.27.123:8080/ITRIOpenAPM/index.jsp?apiProvider=1&dnnID=12345',
            ],
          },
        ],
        font: 'tc',
      },
      {
        text: '\n',
      },
      {
        text: '步驟三 : 以URL瀏覽TensorAPM',
        fontSize: 20,
        font: 'tc',
      },
      {
        type: 'none',
        ol: [
          '例如:',
          {
            type: 'none',
            ol: [
              'http://140.96.27.123:8080/ITRIOpenAPM/index.jsp?apiProvider=1&dnnID=12345',
            ],
          },
        ],
        font: 'tc',
      },
      {
        text: '\n\n',
      },
      {
        text: 'Specifications',
        fontSize: 24,
        bold: true,
      },
      {
        text: '\n',
      },
      {
        ul: [
          'Users run script to upload event logs and obtain an URL to browse to TensorAPM. (details described in User Guide)',
          'Every user will obtain a dedicated instance of TensorAPM, all instances will be isolated by IP port.',
          'All graphs for same user+container IP address are grouped as drop-down items in same TensorAPM.',
          'Once user changes relative to a given container IP address, the TensorAPM instance created for the previous user will be flushed.',
        ],
        alignment: 'justify',
      },
    ],
// PDF footer
    footer: (currentPage, pageCount) => {
      return currentPage !== 1
        ? {
          stack: [
            { text: currentPage, alignment: 'center', fontSize: 8 },
            {
              text:
                '© 2017 工業技術研究院                                                                                                                回到使用者指南',
              alignment: 'right',
              fontSize: 8,
              font: 'tc',
              linkToPage: 2,
              margin: 2,
            },
              // {text:'BackToGuideline', alignment: 'right',fontSize:8, linkToPage: 2, margin: 2,},
              { image: header, width: 600, alignment: 'center' },
          ],
        }
        : {
          stack: [
              // {text:'\n' , alignment: 'center', fontSize:10},
            {
              text: '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
              alignment: 'center',
              fontSize: 1,
            },
              // {text:'© 2017 Industrial Technology Research Institute.                                                                          BackToGuideline', alignment: 'right', fontSize:8 ,linkToPage: 2, margin: 2},
              // {text:'BackToGuideline', alignment: 'right',fontSize:8, linkToPage: 2, margin: 2,},
              { image: header, height: 15, width: 600, alignment: 'center' },
          ],
        };
    },
// PDF header
    header: (currentPage, pageCount) => {
      return {
        image: header,
        width: 600,
        alignment: 'center',
      };
    },
// PDF styles
    styles: {
      title: {
        fontSize: 30,
        bold: true,
        alignment: 'center',
        font: 'tc',
      },
      outline: {
        fontSize: 24,
        margin: [0, 15],
        font: 'tc',
      },
      tableExample: {
        margin: [0, 5, 0, 15],
        alignment: 'center',
      },
    },
  };
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;
  pdfMake.fonts = {
    Roboto: {
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Medium.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-MediumItalic.ttf',
    },
    tc: {
      normal: 'NotoSansTC-Medium.ttf',
      bold: 'NotoSansTC-Bold.ttf',
      italics: 'NotoSansTC-Medium.ttf',
      bolditalics: 'NotoSansTC-Bold.ttf',
    },
  };

  let docContent;
  switch (language) {
    case 'eng':
      docContent = docDefinition;
      break;
    case 'tc':
      docContent = docDefinitionTC;
      break;
    default:
      docContent = docDefinition;
      break;
  }

  const genPDF = pdfMake.createPdf(docContent);
  // console.log(JSON.stringify(docDefinition))
  genPDF.getDataUrl((dataUrl) => {
    let a = window.open('about:blank', 'Tutorial');
    let html = '<html>' +
    '<style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style>' +
    '<body>' +
    '<iframe class="preview-pane" src="' + dataUrl + '"' + 'type="application/pdf" width="100%" height="650" frameborder="0" style="position:relative;z-index:999"></iframe>' +
    '</body></html>';
    a.document.write(html);
    a.document.close();
  });

  // a.document.write(html);

  // _pdf.addHTML(a.document.body,function() {
  //   const string = pdf.output('datauristring');
  //   $('.preview-pane').attr('src', string);
  // })

  // const docDefinition = { content: 'This is an sample PDF printed with pdfMake' }
  // const {vfs} = vfsFonts.pdfMake;
  // pdfMake.vfs = vfs;
  // pdfMake.createPdf(docDefinition).open({}, window.open("about:blank", "Tutorial"))
}

// export const uriPDF = open_data_uri_window(pdf.output('datauristring'))

// function open_data_uri_window(url) {
//    // url = encodeURIComponent(url)
//    // let url_with_name = url.replace("data:application/pdf;", "data:application/pdf;name=myname.pdf;base64,BASE64_DATA_EN‌​CODED")
//    // url_with_name = convertDataURIToBinary(url_with_name)
//    let html = '<html>' +
//   '<style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style>' +
//     '<body>' +
//     '<p>new viewer</p>' +
//     '<iframe class="preview-pane" type="application/pdf" width="100%" height="650" frameborder="0" style="position:relative;z-index:999"></iframe>'
//     // '<iframe type="application/pdf" src="' + url_with_name + '"></iframe>' +
//     '</body></html>';
//     let _pdf = new pdfConverter('p','pt','a4');
//     const a = window.open("about:blank", "Zupfnoter");
//     a.document.write(html);
//  pdf.addHTML(a.document.body,function() {
//  const string = url;
// $('.preview-pane').attr('src', string);
//  })

//     a.document.close();
// }

// const BASE64_MARKER = ';base64,'

// function convertDataURIToBinary(dataURI) {
//   const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
//   const base64 = dataURI.substring(base64Index);
//   const raw = window.atob(base64);
//   const rawLength = raw.length;
//   const array = new Uint8Array(new ArrayBuffer(rawLength));

//   for(i = 0; i < rawLength; i++) {
//     array[i] = raw.charCodeAt(i);
//   }
//   return array;
// }
