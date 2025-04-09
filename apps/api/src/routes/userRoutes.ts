import { Router } from 'express';
import { fetchUserData, updateUserData, fetchAllUsers } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
// router.use(authMiddleware);

router.get('/fetch-all-users/?', fetchAllUsers);
router.get('/fetch-user-data/:userId?', fetchUserData);
router.put('/update-user-data/:userId?', updateUserData);

export default router;
