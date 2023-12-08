import EditOrganisationForm from '@/components/forms/EditOrganisationForm'
import React from 'react'

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <EditOrganisationForm organisation_id={params.id} />
    </div>
  )
}

export default page
