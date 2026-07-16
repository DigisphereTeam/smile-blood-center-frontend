// import { useState } from 'react';
// import { createRequisitionApi } from '../api/requisitionApi';

// export function useCreateRequisition() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   const submitRequisition = async (formData, onSuccess) => {
//     try {
//       setIsSubmitting(true);
//       setError(null);

//       // Execute network api layer transmission
//       const newRecord = await createRequisitionApi(formData);
      
//       if (onSuccess) {
//         onSuccess(newRecord);
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to submit requisition request');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return { submitRequisition, isSubmitting, error };
// }