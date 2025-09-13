import { useEffect, useState } from "react";
import useApi from "./useApi"; // your existing hook

export default function useCustomersByTenants() {
  const {
    data: tenants,
    loading: tenantsLoading,
    error: tenantsError,
  } = useApi("/tenants");

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tenantsError) {
      setError(tenantsError);
      setLoading(false);
      return;
    }

    if (!tenants || tenants.length === 0) {
      setLoading(false);
      return;
    }

    const fetchAllCustomers = async () => {
      try {
        // Instead of calling useApi inside a loop,
        // we trigger its internal logic by calling fetches directly
        const BASE_URL = "http://localhost:8080/api";

        const responses = await Promise.all(
          tenants.map((tenant) =>
            fetch(`${BASE_URL}/customers/tenant/${tenant.tenantId}`).then(
              (res) => res.json()
            )
          )
        );

        setCustomers(responses.flat());
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCustomers();
  }, [tenants, tenantsError]);

  return { customers, loading: tenantsLoading || loading, error };
}
