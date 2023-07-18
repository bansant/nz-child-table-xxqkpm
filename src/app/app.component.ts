import { Component, OnInit } from '@angular/core';

interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number | string;
  creator: string;
  createdAt: string;
  expand: boolean;
}

interface ChildrenItemData {
  key: number;
  name: string;
  oldValue: string;
  newValue: string;
}

@Component({
  selector: 'nz-demo-table-nested-table',
  template: `
    <nz-table #nestedTable [nzData]="listOfParentData" [nzPageSize]="10">
      <thead>
        <tr>
          <th nzShowExpand></th>
          <th>Module</th>
          <th>Sub Module</th>
          <th>Event</th>
          <th>Actioned By</th>
          <th>Actioned On</th>
        </tr>
      </thead>
      <tbody>
        <ng-template ngFor let-data [ngForOf]="nestedTable.data" let-i="index">
          <tr>
            <td
              nzShowExpand
              [(nzExpand)]="data.expand"
              (nzExpandChange)="singleExpand($event, i,data.key)"
            ></td>
            <td>{{ data.name }}</td>
            <td>{{ data.platform }}</td>
            <td>{{ data.version }}</td>
            <td>{{ data.creator }}</td>
            <td>{{ data.createdAt }}</td>
          </tr>
          <tr [nzExpand]="data.expand">
            <td></td>
            <td colspan="7">
              <nz-table
                #innerTable
                [nzData]="listOfChildrenData"
                nzSize="middle"
              >
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Old Value</th>
                    <th>New Value</th>
                    <th>Status </th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let data of innerTable.data">
                    <td>{{ data.name }}</td>
                    
                    <td>{{ data.oldValue }}</td>
                    <td>{{ data.newValue }}</td>
                    <td>
                      <nz-badge
                        [nzStatus]="'success'"
                        [nzText]="'Finished'"
                      ></nz-badge>
                    </td>
                    
                  </tr>
                </tbody>
              </nz-table>
            </td>
          </tr>
        </ng-template>
      </tbody>
    </nz-table>
  `,
})
export class NzDemoTableNestedTableComponent implements OnInit {
  listOfParentData: ParentItemData[] = [];
  listOfChildrenData: ChildrenItemData[] = [];

  ngOnInit(): void {
    this.listOfParentData.push({
      key: 1,
      name: 'CRM',
      platform: 'People',
      version: 'Create',
      upgradeNum: 500,
      creator: 'Jack Reacher',
      createdAt: '2023-1-24 23:12:00',
      expand: false,
    });
    this.listOfParentData.push({
      key: 2,
      name: 'CRM',
      platform: 'People',
      version: 'Update',
      upgradeNum: 500,
      creator: 'Jack Reacher',
      createdAt: '2023-1-24 23:12:00',
      expand: false,
    });
    this.listOfParentData.push({
      key: 3,
      name: 'CRM',
      platform: 'Organization',
      version: 'Update',
      upgradeNum: 500,
      creator: 'John Doe',
      createdAt: '2022-12-24 23:14:00',
      expand: false,
    });

    this.listOfParentData.push({
      key: 4,
      name: 'CRM',
      platform: 'People',
      version: 'Delete',
      upgradeNum: 500,
      creator: 'Chris Jonas',
      createdAt: '2021-10-24 23:13:00',
      expand: false,
    });
  }

  singleExpand(value, index, key) {
    if (value) {
      this.listOfParentData.forEach((data, i) => {
        if (index !== i) {
          data.expand = false;
          this.listOfChildrenData = [];
          if (key == 2) {
            this.listOfChildrenData.push({
              key: 2,
              name: 'First Name',
              oldValue: 'Samuel',
              newValue: 'Sam',
            });

            this.listOfChildrenData.push({
              key: 2,
              name: 'Last Name',
              oldValue: 'Coter',
              newValue: 'Cotter',
            });
          }

          if (key == 1) {
            this.listOfChildrenData.push({
              key: 1,
              name: 'First Name',
              oldValue: '',
              newValue: 'Samuel',
            });

            this.listOfChildrenData.push({
              key: 1,
              name: 'Last Name',
              oldValue: '',
              newValue: 'Coter',
            });
          }

          if (key == 3) {
            this.listOfChildrenData.push({
              key: 3,
              name: 'OrgName',
              oldValue: 'NOrg',
              newValue: 'Nobel org',
            });

            this.listOfChildrenData.push({
              key: 3,
              name: 'Org Memeber',
              oldValue: '25',
              newValue: '30',
            });

            this.listOfChildrenData.push({
              key: 3,
              name: 'Org Type',
              oldValue: 'Non Member',
              newValue: 'Memeber',
            });
          }

          if (key == 4) {
            this.listOfChildrenData.push({
              key: 3,
              name: 'Id',
              oldValue: '3',
              newValue: '',
            });
          }
        }
      });
    }
  }
}
