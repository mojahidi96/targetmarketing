import { Validators } from "@angular/forms";
export const adminFormBuilder = {
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    account_name: ['', Validators.required],
    primary_contact_person: ['', Validators.required],
    account_contact_number: ['', Validators.required],
    primary_contact_number: ['', Validators.required],
    industry: ['', Validators.required],
    primary_contact_person_designation: ['', Validators.required],
    expected_revenue: ['', Validators.required],
    isMember: ['', Validators.required],
    chamber_id: ['', Validators.required],
    logo: ['', Validators.required]
};
