import { APP_ID, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { activities, projects } from 'src/app/model/timer';
import { AccountService } from 'src/app/shared/_services/account-service';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { CostCenterService } from 'src/app/shared/_services/cost-center.service';
import { EmployeeBillingService } from 'src/app/shared/_services/employee-billing.service';
import { TimerActivitiesService } from 'src/app/shared/_services/timer-activities.service';
import { TimerProjectsService } from 'src/app/shared/_services/timer-projects.service';
import { TimnerProjectAssineService } from 'src/app/shared/_services/timner-project-assine.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.css']
})
export class CostCenterComponent implements OnInit {
  form: any = {}
  CostCenterList: Array<any> = [];
  ProjectList: Array<projects> = [];
  ActivityList: Array<activities> = [];
  ActivitiesByproject: Array<activities> = [];
  EmployeeList: Array<any> = []
  EmployeebillTypeChargeList: Array<any> = []
  UserAccountLIst: Array<any> = []
  empId = 0
  constructor(
    private authService: AuthService,
    private activityService: TimerActivitiesService,
    private projectService: TimerProjectsService,
    private permissionService: TimnerProjectAssineService,
    private accountService: AccountService,
    private employeeBillService: EmployeeBillingService,
    private toster: ToastrService,
    private costCenterSerive: CostCenterService
  ) { }

  ngOnInit(): void {
    this.getactivityList()
    this.getProjectList()
    this.getCostCenter()
    this.getuser()
  }
  Delete(obj: any) {
    this.costCenterSerive.delete(obj.id).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.toster.success("Deleted Successfully"),
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
  getCostCenter() {
    this.costCenterSerive.get().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.CostCenterList = data.data
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
  public home() {
    window.location.href = environment.xilontechPortal
    this.authService.logout()
  }
  createCostCenter() {
    let obj = {
      projectcode: this.form.projectCode,
      activitycode: this.form.activitiesCode,
      userid: this.getEmpiD(this.form.user),
      chargetype: this.form.chargetype,
      chargerate: this.form.chargerate,
      outsourcingtype: this.form.outsourcingtype,
      outsourcingrate: this.form.outsourcingrate,
    }
    this.costCenterSerive.create(obj).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          console.log(data.data)
          let ref = document.getElementById('cancel')
          if (ref === null) {
            console.log("null")
          }
          else {
            ref.click(),
              this.toster.success("Billing Add Successfully"),
              this.ngOnInit()
          }
        }
        else {
          this.toster.error(data.apiStatus.message)
          // console.log(data.apiStatus.message)
        }
      },
      err => {
        this.toster.error(err.error + 'Input is Invalid')
        // console.log()
      }
    )
  }
  getProjectName(projectCode: String): string {
    let result = 'none'
    let findName = this.ProjectList.filter(item => item.projectCode === projectCode)
    if (findName.length != 0) {
      result = findName[0].projectname
    }
    else {
      // console.log('no project found')
    }
    return result
  }
  getactivitiesByProject() {
    // console.log(this.ActivityList)
    this.ActivitiesByproject = this.ActivityList.filter((item: any) => item.projectCode === this.form.projectCode)
    if (this.ActivitiesByproject.length === 0) {
      this.toster.error('No Activity Add to this Project')
    }
  }
  getActivityName(activitycode: String) {
    let result = 'none'
    let findName = this.ActivityList.filter(item => item.activitiesCode === activitycode)
    if (findName.length != 0) {
      result = findName[0].activitiesname
    }
    else {
      // console.log('no activity found')
    }
    return result
  }
  getProjectList() {
    this.projectService.gettimeprojects().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.ProjectList = data.data
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
  getactivityList() {
    this.activityService.gettimeactivities().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.ActivityList = data.data
          // console.log(this.ActivityList)
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
  getEmployeeListByProjectAcvtivity() {
    this.permissionService.gettimeprojectsAssine().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.EmployeeList = data.data.filter((item: any) => item.type === this.form.projectCode && item.permission === this.form.activitiesCode)
          // console.log(list)
          if (this.EmployeeList.length === 0) {
            this.toster.error('No Employee are allocated to this Activity')
          }
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
  getEmployeeBillTypeCharge() {
    this.accountService.getAccounts().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.UserAccountLIst = data.data
          this.empId = data.data.filter((item: any) => item.user === this.form.user)[0].id
          this.employeeBillService.get().pipe(first()).subscribe(
            data => {
              if (data.apiStatus.message === 'OK') {
                this.EmployeebillTypeChargeList = data.data.filter((item: any) => item.userid === this.empId)
                if (this.EmployeebillTypeChargeList.length === 0) {
                  this.toster.error('Employee Have No Billing type Allocated')
                }
              }
              else {
                console.log(data.apiStatus.message)
              }
            }
            , err => {
              console.log(err.error)
            }
          )
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
  getChargeRate() {
    console.log(this.empId)
    console.log(this.form.chargetype)
    this.form.chargerate = this.EmployeebillTypeChargeList.filter((item: any) => item.userid === this.empId && item.chargetype === this.form.chargetype)[0].chargerate

  }
  getEmpiD(user: string) {
    let result = 'none'
    let dataUser = this.UserAccountLIst.filter((item: any) => item.user === user)
    console.log(dataUser)
    if (dataUser.length != 0) {
      result = dataUser[0].id
    }
    else {
      // console.log('no user found')
    }
    return result
  }
  getEmployeeName(id: number): string {
    let result = "none"
    // console.log(id)
    let findUserName = this.UserAccountLIst.filter(item => item.id === id)
    if (findUserName.length != 0) {
      result = findUserName[0].user
    }
    else {
      // console.log('no user found')
    }
    return result
  }
  getuser() {
    this.accountService.getAccounts().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.UserAccountLIst = data.data
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
}
