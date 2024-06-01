import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AccountService } from 'src/app/shared/_services/account-service';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { EmployeeBillingService } from 'src/app/shared/_services/employee-billing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-billing',
  templateUrl: './employee-billing.component.html',
  styleUrls: ['./employee-billing.component.css']
})
export class EmployeeBillingComponent implements OnInit {

  form: any = {}
  EmployeeList: Array<any> = []
  selectedEmployee = 'none'
  EmployeeBillingList: Array<any> = []
  constructor(
    private authService: AuthService,
    private account: AccountService,
    private toastr: ToastrService,
    private employeebill: EmployeeBillingService
  ) { }

  ngOnInit(): void {
    this.getuser()
    this.setEmpty()
  }
  getuser() {
    this.account.getAccounts().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.EmployeeList = data.data
          this.getemployeeBilingList()
        }
        else {
          console.log(data.apiStatus.message)
        }
      },
      err => {
        console.log(err.error)
      }
    )
  }
  getEmployeeName(id: number): string {
    let result = "none"
    let findUserName = this.EmployeeList.filter(item => item.id == id)
    result = findUserName[0].user
    return result
  }

  getemployeeBilingList() {
    this.employeebill.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message == 'OK') {
          this.EmployeeBillingList = data.data
        }
        else {
          console.log(data.apiStatus.message)
        }
      },
      err => {
        console.log(err.error)
      }
    )
  }

  createEmployeeCharge() {
    let obj = {
      userid: this.selectedEmployee,
      chargetype: this.form.ChargeType,
      chargerate: this.form.ChargeRate
    }
    this.employeebill.create(obj).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          console.log(data.data)
          let ref = document.getElementById('cancel')
          if (ref === null) {
            console.log("null")
          }
          else {
            ref.click(),
              this.toastr.success("Activiy updated Successfully"),
              this.ngOnInit()
          }
        }
        else {
          console.log(data.apiStatus.message)
          alert(data.apiStatus.message)
        }
      },
      err => {
        console.log(err.error)
      }
    )
  }
  Delete(obj: any) {
    this.employeebill.delete(obj.id).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.toastr.success('Data Deleted Successfully')
          this.ngOnInit()
        }
        else {
          console.log(data.apiStatus.message)
        }
      },
      err => {
        console.log(err.error)
      }
    )
  }
  setEmpty() {
    this.selectedEmployee = 'none'
  }
  public home() {
    window.location.href = environment.xilontechPortal
    this.authService.logout()
  }
}
