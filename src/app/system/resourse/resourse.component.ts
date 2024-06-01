import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first, pipe } from 'rxjs';
import { CustomersList, projectsAssine } from 'src/app/model/timer';
import { AccountService } from 'src/app/shared/_services/account-service';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { TimnerProjectAssineService } from 'src/app/shared/_services/timner-project-assine.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resourse',
  templateUrl: './resourse.component.html',
  styleUrls: ['./resourse.component.css']
})
export class ResourseComponent implements OnInit {
  form: any = {}
  useraccountList: Array<CustomersList> = []
  userReportsTo: Array<any> = []
  employe = new CustomersList()
  permissionList: Array<any> = []
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private PermissionService: TimnerProjectAssineService,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getpermission()
    this.getAlluser()
  }
  public home() {
    window.location.href = environment.xilontechPortal
    this.authService.logout()
  }
  getAlluser() {
    this.useraccountList=[]
    this.accountService.getAccounts().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          data.data.map((accountitem: any) => {
            let user = new CustomersList()
            user = accountitem
            let reportuser = this.permissionList.filter((item: any) => item.permission === accountitem.user)
            if (reportuser.length != 0) {
              user.reportsTo = reportuser[0].user
            }
            this.useraccountList.push(user)
          })
          // console.log(this.useraccountList)
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
  submitEdit() {
    this.employe.employeetype = this.form.employeetype
    this.updateacccount(this.employe)
  }
  updatepermission(obj: any, id: number) {
    this.PermissionService.puttimeprojectsAssine(obj, id).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          console.log(data.data)
          let ref = document.getElementById('cancelUpdate')
          if (ref === null) {
            console.log('ref-error')
          }
          else {
            ref.click(),
              this.toster.success("Updated Sucessfully")
              this.ngOnInit()
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
  getpermission() {
    this.PermissionService.gettimeprojectsAssine().pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          this.permissionList = data.data.filter((item: any) => item.type === 'ReportsTo')
          // console.log(this.permissionList)
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
  createpermission(obj: any) {
    this.PermissionService.posttimeprojectsAssine(obj).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          // console.log(data.data)
          let ref = document.getElementById('cancelUpdate')
          if (ref === null) {
            console.log('ref-error')
          }
          else {
            ref.click(),
              this.toster.success("Created Sucessfully")
            this.ngOnInit()
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
  updateacccount(obj: any) {
    let projetAssine = new projectsAssine()
    projetAssine.permission = this.employe.user
    projetAssine.user = this.form.ReportsTo
    projetAssine.type = "ReportsTo"
    this.accountService.updateAccounts(obj.id, obj).pipe(first()).subscribe(
      data => {
        if (data.apiStatus.message === 'OK') {
          // console.log(data.data)
          let findpermission = this.permissionList.filter((item: any) => item.permission === projetAssine.permission)
          // console.log(findpermission)
          if (findpermission.length === 0) {
            // console.log('permission not found')
            this.createpermission(projetAssine)
          }
          else {
            // console.log('permission found')
            this.updatepermission(projetAssine, findpermission[0].id)
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
  update(obj: any) {
    this.form.employeetype = obj.employeetype;
    this.employe = obj
    this.EmployeListRepotsTo(obj.user)
  }
  EmployeListRepotsTo(user: string) {
    this.userReportsTo = this.useraccountList.filter((item: any) => item.user != user)
  }
}
