'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Pagination } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import { fetchAllUsers } from '../apis/userApi';
import UpdateButton from './UpdateButton';
import { format } from 'date-fns';

interface User {
    id: string;
    email: string;
    name: string;
    createdAt: number;
    updatedAt: number;
    totalAverageWeightRatings: number;
    numberOfRents: number;
    recentlyActive: number;
}

interface UpdateStatus {
    userId: string;
    success: boolean;
    error: string | null;
    timestamp: number;
}

interface PaginationInfo {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

interface DashboardTemplateProps {
    children?: React.ReactNode;
}

export default function DashboardTemplate({ children }: DashboardTemplateProps) {
    const { user: authUser } = useAppSelector((state) => state.auth);
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({ total: 0, page: 1, limit: 10, pages: 0 });
    const [loading, setLoading] = useState(false);
    const [updateStatus, setUpdateStatus] = useState<UpdateStatus | null>(null);

    useEffect(() => {
        loadUsers(1);
    }, []);

    // Auto clear update status after 5 seconds
    useEffect(() => {
        if (updateStatus) {
            const timer = setTimeout(() => {
                setUpdateStatus(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [updateStatus]);

    const loadUsers = async (page: number) => {
        try {
            setLoading(true);
            const data = await fetchAllUsers();
            setUsers(data.users);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        loadUsers(page);
    };

    const formatDate = (timestamp: number) => {
        try {
            return format(new Date(timestamp), 'MMM d, yyyy');
        } catch (e) {
            return 'Invalid date';
        }
    };

    const handleUserUpdate = (userId: string, success: boolean, error: string | null, newName: string) => {
        // Update the local state for immediate UI update
        if (success) {
            setUsers(users.map(user =>
                user.id === userId
                    ? { ...user, name: newName, updatedAt: Date.now() }
                    : user
            ));
        }

        // Set update status for notification
        setUpdateStatus({
            userId,
            success,
            error,
            timestamp: Date.now()
        });
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard
            </Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    All Users
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Recently Active</TableCell>
                                        <TableCell>Average Rating</TableCell>
                                        <TableCell>Number of Rents</TableCell>
                                        <TableCell>Update User</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{formatDate(user.recentlyActive)}</TableCell>
                                            <TableCell>{user.totalAverageWeightRatings.toFixed(1)}</TableCell>
                                            <TableCell>{user.numberOfRents}</TableCell>
                                            <TableCell>
                                                <UpdateButton
                                                    userId={user.id}
                                                    onUpdate={(success, error, name) => handleUserUpdate(user.id, success, error, name)}
                                                    showStatus={updateStatus?.userId === user.id}
                                                    statusSuccess={updateStatus?.userId === user.id ? updateStatus.success : undefined}
                                                    statusError={updateStatus?.userId === user.id ? updateStatus.error : null}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {pagination.pages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                <Pagination
                                    count={pagination.pages}
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Box>
                        )}
                    </>
                )}
            </Paper>
            <div>{children}</div>
        </Container>
    );
}