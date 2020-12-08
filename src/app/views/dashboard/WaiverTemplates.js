import React, { useState } from 'react';
import File from '../../components/File';
import cloudUpload from '../../images/dashboard/cloud-upload.png';
import templates from './templates';
import Popup from '../../components/Popup';

// function WaiverTemplate() {
//   const templateStyle = {
//     marginLeft: '40px',
//     marginTop: '40px',
//   };

//   function getDate(uploadDate) {
//     const date = `${uploadDate.toLocaleDateString(undefined, { month: 'short' })}
//    ${uploadDate.toLocaleDateString(undefined, { day: '2-digit' })},
//    ${uploadDate.toLocaleDateString(undefined, { year: 'numeric' })}`;
//     return date;
//   }

//   return (
//     <div style={templateStyle}>
//       <File name="fileName" url="ctc-uci.com" imagePreview="https://i.pinimg.com/originals/7f/d2/e4/7fd2e46b2da9819e667fb75caf475cf7.png" dateCreated={getDate(new Date())} />
//     </div>
//   );
// }

// class WaiverTemplates extends Component {
//   componentDidMount() {

//   }

//   render() {
//     const uploadStyle = {
//       height: '200px',
//       width: '154px',
//       border: '1px solid black',
//       marginLeft: '40px',
//       marginTop: '40px',
//       display: 'flex',
//       flexDirection: 'column',
//     };
//     const uploadImgStyle = {
//       margin: 'auto',
//       marginBottom: 0,
//       display: 'block',
//       width: '50px',
//     };

//     return (
//       <div style={{ display: 'flex', flexWrap: 'wrap' }} className="waiver-list">
//         <div style={uploadStyle}>
//           <img style={uploadImgStyle} src={cloudUpload} alt="upload to cloud" />
//           <div style={{ margin: 'auto', marginTop: '4px' }}>Upload template</div>
//         </div>
//         <WaiverTemplate />
//         <WaiverTemplate />
//         <WaiverTemplate />
//         <WaiverTemplate />
//         <WaiverTemplate />
//         <WaiverTemplate />
//         <WaiverTemplate />
//         <WaiverTemplate />
//       </div>
//     );
//   }
// }

// // MAPPING SAMPLE TEMPLATE ARRAY TO FILE COMPONENT
// const exampleTemplates = templates.info.map(
//   (temps) => (

//     <File
//       key={temps.id}
//       id={temps.id}
//       fileName={temps.name}
//       date={getDate(temps.date)}
//       url={temps.url}
//       getId={returnID}
//     />
//   ),
// );

const WaiverTemplates = () => {
  // componentDidMount() {

  // }

  const [showPopup, setShowPopup] = useState(false);

  const getDate = (uploadDate) => {
    const date = `${uploadDate.toLocaleDateString(undefined, { month: 'short' })}
  ${uploadDate.toLocaleDateString(undefined, { day: '2-digit' })},
  ${uploadDate.toLocaleDateString(undefined, { year: 'numeric' })}`;
    return date;
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // STYLING TEMPLATES
  const templateStyle = {
    height: '200px',
    width: '154px',
    marginLeft: '40px',
    marginRight: '50px',
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'row',
  };

  const uploadStyle = {
    height: '200px',
    width: '154px',
    border: '1px solid black',
    marginLeft: '40px',
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
  };
  const uploadImgStyle = {
    margin: 'auto',
    marginBottom: 0,
    display: 'block',
    width: '50px',
  };

  const returnID = (id) => {
    console.log('returned', id);
  };

  const [templateList] = useState(
    templates.info.map(
      (temps) => (
        <File
          key={temps.id}
          id={temps.id}
          fileName={temps.name}
          date={getDate(temps.date)}
          url={temps.url}
          initCopy={false}
          getId={returnID}
        />
      ),
    ),
  );

  // const resetCopy = (id) => {
  //   for (let i = 0; i < templateList.length; i + 1) {
  //       if templateList[i].File.props.id !== id{
  //         templateList.[i].props.initCopy = false;
  //       }
  //   }
  // };

  // RENDERING TEMPLATE MANAGER PAGE
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }} className="waiver-list">
      <div style={uploadStyle}>
        <a
          style={{
            margin: 'auto', marginTop: '60px', color: 'black', textDecoration: 'none',
          }}
          href="#  "
          onClick={togglePopup}
        >
          <img
            style={uploadImgStyle}
            src={cloudUpload}
            alt="upload to cloud"
          />
          <div style={{ margin: 'auto', marginTop: '4px' }}>
            Upload template
          </div>
        </a>
        {showPopup ? <Popup closePopup={togglePopup} /> : null}
      </div>

      <div style={templateStyle}>
        {templateList}
      </div>
    </div>
  );
};

export default WaiverTemplates;
