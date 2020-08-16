import React, { Component } from "react"
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

export default class ImportExcel extends Component {
   constructor(props) {
      super(props);

      this.state = {
         gradesId: this.props.item.grades_id,
         gradesName: this.props.item.grades_name,
         gradesGroupsId: this.props.item.grades_groups_id,
         gradesGroupsName: this.props.item.grades_groups_name,
         cols: [],
         rows: [],
         displayError: "none"
      }

      this.fileHandler = this.fileHandler.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleModalClose = this.handleModalClose.bind(this)
   }

   fileHandler(e) {
      let fileObj = e.target.files[0];

      ExcelRenderer(fileObj, (err, resp) => {
         if (err) {
            console.log(err);
         }
         else {
            console.log('cols', resp.cols);
            console.log('rows', resp.rows);

            this.setState({
               cols: resp.cols,
               rows: resp.rows
            });

            if (resp.cols.length < 3 || resp.cols.length > 3) {
               this.setState({
                  displayError: "block"
               })
            }
            else {
               this.setState({
                  displayError: "none"
               })

            }
         }
      });

   }

   handleSubmit() {

      if (this.state.cols.length < 3 || this.state.cols.length > 3) {
         console.log('There must be 3 columns in the excel file. Example: first name, last name, gender');
      } else {
         console.log('Import students list excel file to Database');



      }
   }

   handleModalClose() {
      this.props.handleModalClose()
   }

   render() {
      return (
         <div className="import-main-wrapper">
            <div className="title">
               <p>Import excel file to upload students</p>
               <p>{this.state.gradesName}</p>
               <p>{this.state.gradesGroupsName}</p>
               <button type="button" onClick={this.handleSubmit}>Save</button>
               <button type="button" onClick={this.handleModalClose}>Cancel</button>
            </div>

            <div className="choose-file">
               <input type="file" name="file" onChange={this.fileHandler} />
            </div>
            {this.state.displayError === "block" ? (
               <div className="error-message" style={{ display: `${this.state.displayError}` }}>
                  <p>There must be 3 columns in the excel file. Example: first name, last name, gender</p>
               </div>
            ) :
               (
                  <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
               )
            }
         </div>
      )
   }
}