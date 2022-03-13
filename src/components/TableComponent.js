import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import DeleteIcon from '@material-ui/icons/Delete';
import Search from "@material-ui/icons/Search";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ViewColumn from "@material-ui/icons/ViewColumn";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),

  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
/*This is Table Component of material table*/
const TableComponent = (props) => {
  const data = [...props.userData].reverse();
  return (
    <MaterialTable
      icons={tableIcons}
      title="User Info"
      columns={[
        { title: "Name", field: "name" },
        { title: "Birth Date", field: "date", type: "date" },
        { title: "Address", field: "address" },
        {
          title: "Gender",
          field: "gender",
        },
        {
          title: "College Name",
          field: "collegeName",
        },
        {
          title: "Hobbies",
          field: "hobbyArray",
          render: rowData=> { return (<p>{rowData.hobbyArray
            .filter((item) => item !== "other")
            .toString()}</p> );},
        },
      ]}
      data={data}
      actions={[
        (rowData) => ({
          icon: Edit,
          tooltip: "Update User Information",
          onClick: (event, rowData) => {
            props.handleOpen(rowData.id);
          },
        }),
        (rowData) => ({
          icon: Clear,
          tooltip: "Delete User",
          onClick: (event, rowData) => {
            if (
              window.confirm("Are You Sure You want to Delete Data") === true
            ) {
              props.onItemDelete(rowData.id);
            }
          },
        }),
      ]}
      options={{
        headerStyle: {backgroundColor:'ThreeDHighlight',fontWeight:'bold'},
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default TableComponent;
