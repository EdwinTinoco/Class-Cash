import React, { Component } from "react";
import axios from "axios";
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

export default class ImportExcel extends Component {
   constructor(props) {
      super(props);

      this.state = {
         userName: this.props.item.Username,
         gradesId: this.props.item.grades_id,
         gradesName: this.props.item.grades_name,
         gradesGroupsId: this.props.item.grades_groups_id,
         gradesGroupsName: this.props.item.grades_groups_name,
         cols: [],
         rows: [],
         totalRows: 0,
         validateCols: false,
         validateGender: false,
         displayError: "none",
         messageImportSuccefully: "",
         errorMessage: "",
         saveDatabase: false
      }

      this.fileHandler = this.fileHandler.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleModalClose = this.handleModalClose.bind(this)
   }

   fileHandler(e) {
      let valCols = this.state.validateCols
      let valGender = this.state.validateGender

      this.setState({
         messageImportSuccefully: ""
      })

      let fileObj = e.target.files[0];
      ExcelRenderer(fileObj, (err, resp) => {
         if (err) {
            console.log(err);
         }
         else {
            if (resp.cols.length < 3 || resp.cols.length > 3) {
               valCols = true
            } else {
               let firstItem = resp.rows.shift()

               resp.rows.map(row => {
                  if (row[2] !== undefined) {
                     if (typeof row[2] !== 'number') {
                        let gender = row[2].toUpperCase()

                        if (gender !== "F") {
                           if (gender !== 'M') {
                              valGender = true
                           }
                        }
                     } else {
                        valGender = true
                     }
                  } else {
                     valGender = true
                  }
               })
            }

            if (valCols) {
               this.setState({
                  cols: [],
                  rows: [],
                  displayError: "block",
                  errorMessage: "There must be 3 columns in the excel file. Example: First name, Last name, Gender",
                  saveDatabase: false
               })
            } else if (valGender) {
               this.setState({
                  cols: [],
                  rows: [],
                  displayError: "block",
                  errorMessage: "Check the gender in the excel file. The Gender must be 'F' for female or 'M' for male",
                  saveDatabase: false
               })
            } else {
               this.setState({
                  cols: resp.cols,
                  rows: resp.rows,
                  totalRows: resp.rows.length,
                  validateCols: false,
                  validateGender: false,
                  displayError: "none",
                  errorMessage: "",
                  saveDatabase: true
               })
            }
         }
      });
   }

   handleSubmit() {
      if (this.state.saveDatabase) {
         this.state.rows.map(row => {
            let gender = row[2].toUpperCase()

            axios.post('https://class-cash-api-ed.herokuapp.com/add-student',
               {
                  students_first_name: row[0],
                  students_last_name: row[1],
                  students_gender: gender,
                  students_image_url: "https://toppng.com/uploads/preview/mickey-mouse-11549813294phgckvoyy5.png",
                  students_grades_id: parseInt(this.state.gradesId),
                  students_grades_groups_id: parseInt(this.state.gradesGroupsId),
                  bank_current_total: 0
               },
            )
               .then(response => {
                  this.setState({
                     displayError: "none",
                     messageImportSuccefully: "Excel file was succesfully imported!",
                     saveDatabase: false
                  })
               })
               .catch(error => {
                  console.log('handleSubmit error', error);
               })
         })
      } else {
         this.setState({
            displayError: "block",
            errorMessage: "Select an excel file"
         })
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
            </div>

            <div className="teacher-grade-group">
               <p>{this.state.userName}</p>
               <p>{this.state.gradesName}</p>
               <p>Group: {this.state.gradesGroupsName}</p>
            </div>

            <div className="excel-file-directions">
               <p>Note: The excel file must to contain a header divided in 3 columns.
               Example header: First name, Last name, Gender. The column gender must to contain
                  a letter M for male or F for female</p>
            </div>

            <div className="buttons">
               <button type="button" onClick={this.handleSubmit}>Save</button>
               <button type="button" onClick={this.handleModalClose}>Close</button>
            </div>

            <div className="message">
               <p>{this.state.messageImportSuccefully}</p>
            </div>

            <div className="choose-file">
               <input type="file" name="file" onChange={this.fileHandler} />
               <p>Total students in the excel file to import: {this.state.totalRows}</p>
            </div>

            {this.state.displayError === "block" ? (
               <div className="error-message" style={{ display: `${this.state.displayError}` }}>
                  <p>{this.state.errorMessage}</p>
               </div>
            ) :
               (
                  <div className="excel-preview">
                     <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
                  </div>
               )
            }
         </div>
      )
   }
}