import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Utils
import dashboardService from 'service/api/dashboardService';


// Components
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DashboardCard from 'components/Common/Card/DashboardCard';
import EmpSuccessPayment from 'components/new/pages/employees/payment/EmpSuccessPayment';
import { EmpFailedPayment } from 'components/new/pages/employees/payment/EmpFailedPayment';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

const PaymentResult = () => {
    let [searchParams] = useSearchParams();
    const [loading, setLoading] = useState({ initial: true });
    const [order, setOrder] = useState(false);
    const [breadCrumbLinks, setBreadCrumbLinks] = useState([
        { path: '/dashboard', title: 'پیشخوان' },
        { path: '/dashboard/services/', title: 'خدمات رفاهی' },
    ]);
 
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await dashboardService
                .get(`orders/${searchParams.get('order_id')}`, { signal })
                .then((res) => {
                    setOrder(res.data.data);
                    setBreadCrumbLinks([...breadCrumbLinks, { title: res.data.data.service.name }]);
                })
                .catch((err) => {
                    console.log(5555555);
                });

            setLoading({
                initial: false,
            });
        })();

        return () => controller.abort();
    }, []);

    return (
        <DashboardCard pt="32px">
            <Breadcrumb links={breadCrumbLinks} />

            <DLoadingWrapper loading={loading.initial}>
                {searchParams.get('status') === 'reject' ? <EmpFailedPayment order={order} /> : <EmpSuccessPayment order={order} />}
            </DLoadingWrapper>
        </DashboardCard>
    );
};

export default PaymentResult;
