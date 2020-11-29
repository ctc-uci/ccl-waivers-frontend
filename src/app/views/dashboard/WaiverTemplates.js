import File from '../../components/File';

function WaiverTemplates() {
  function getDate(uploadDate) {
    const date = `${uploadDate.toLocaleDateString(undefined, { month: 'short' })} ${uploadDate.toLocaleDateString(undefined, { day: '2-digit' })}, ${uploadDate.toLocaleDateString(undefined, { year: 'numeric' })}`;
    return date;
  }

  return (
    <div className="waiver-list">
      <div>template</div>
      <File name="fileName" url="#" imagePreview="https://i.pinimg.com/originals/7f/d2/e4/7fd2e46b2da9819e667fb75caf475cf7.png" dateCreated={getDate(new Date())} />
    </div>
  );
}

export default WaiverTemplates;
