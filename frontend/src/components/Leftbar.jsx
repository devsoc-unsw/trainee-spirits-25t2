import Form from "./Form";
import MemoDetail from "./MemoDetail";
import MemoList from "./MemoList";
const Leftbar = ({
  selectedMemo,
  setSelectedMemo,
  clickedPoint,
  setClickedPoint,
}) => {
  if (!selectedMemo && !clickedPoint) {
    return (
      <MemoList
        setSelectedMemo={setSelectedMemo}
        setClickedPoint={setClickedPoint}
      />
    );
  }

  if (selectedMemo)
    // Detail view
    return (
      <MemoDetail
        selectedMemo={selectedMemo}
        setSelectedMemo={setSelectedMemo}
      />
    );

  if (clickedPoint) {
    return (
      <Form
        selectedMemo={selectedMemo}
        clickedPoint={clickedPoint}
        setClickedPoint={setClickedPoint}
      />
    );
  }
};

export default Leftbar;
