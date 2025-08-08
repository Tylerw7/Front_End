import React, {useState} from "react"
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import {Loader2} from 'lucide-react'
import axios from 'axios'
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";



const Register = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [remember, setRemember] = useState(false);
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate()
    
    
      const handleSubmit = async (e: any) => {
        e.preventDefault(e)

        try {
            const response = await axios.post('https://hcmpblog-server-7cdb5790849d.herokuapp.com/create-user', {
                email,
                password
            },
            { withCredentials: true }
        )

            toast.success('Success')
            //---Re-Route to blog generator--//
            navigate('/blog-generator')
        
        } catch (err: unknown) {
            console.log(err)
            toast.error('Email or Passowrd was incorrect!')
        }
      }

      


    return ( 
        <>
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="w-full max-w-md shadow-xl">
                    <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">HCMP Blog Generator</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        </div>

                        <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        </div>

                        <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Switch
                            id="remember"
                            checked={remember}
                            onCheckedChange={(val) => setRemember(val)}
                            />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <a href="/forgot-password" className="text-sm text-red-500 hover:underline">
                            Forgot password?
                        </a>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            "Login"
                        )}
                        </Button>
                    </form>
                    </CardContent>
                </Card>
            </div>

        </>
     );
}
 
export default Register;