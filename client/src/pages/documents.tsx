import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IDManager } from "@/components/id-manager";
import { LetterGenerator } from "@/components/letter-generator";
import { 
  FileText, CreditCard, Shield, Mail, 
  Key, Edit, Download, Copy
} from "lucide-react";

export default function Documents() {
  const [activeTab, setActiveTab] = useState("id-manager");

  const features = [
    {
      icon: CreditCard,
      title: "Manajemen ID Penting",
      description: "Kelola dokumen identitas dan sertifikat penting dengan aman",
      items: ["KTP, SIM, Paspor", "NPWP, BPJS", "Sertifikat & Ijazah", "Link terkait dokumen"]
    },
    {
      icon: Mail,
      title: "Generator Surat",
      description: "Buat surat-surat resmi dengan template profesional",
      items: ["Surat Lamaran Kerja", "Surat Pengunduran Diri", "Surat Rekomendasi", "Surat Izin & Pengaduan"]
    }
  ];

  const quickActions = [
    {
      icon: Key,
      title: "Tambah ID Baru",
      description: "Simpan dokumen identitas",
      action: () => setActiveTab("id-manager")
    },
    {
      icon: Edit,
      title: "Buat Surat Lamaran",
      description: "Template surat lamaran kerja",
      action: () => setActiveTab("letter-generator")
    },
    {
      icon: Shield,
      title: "Backup Data",
      description: "Export semua dokumen",
      action: () => {
        // Export functionality
        if ((window as any).showNotif) {
          (window as any).showNotif('Fitur backup dalam development', 'info');
        }
      }
    },
    {
      icon: Copy,
      title: "Template Surat",
      description: "Akses cepat template",
      action: () => setActiveTab("letter-generator")
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8" id="documents-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Manajemen Dokumen Penting
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kelola ID penting dan buat surat-surat resmi dengan mudah dan aman
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  onClick={action.action}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Icon className="h-6 w-6 text-blue-600" />
                  <div className="text-center">
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="id-manager" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Manajemen ID
            </TabsTrigger>
            <TabsTrigger value="letter-generator" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Generator Surat
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="id-manager" className="space-y-6">
            <IDManager />
          </TabsContent>
          
          <TabsContent value="letter-generator" className="space-y-6">
            <LetterGenerator />
          </TabsContent>
        </Tabs>

        {/* Security Notice */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 mb-1">Keamanan Data</h3>
                <p className="text-sm text-yellow-700">
                  Semua data disimpan secara lokal di browser Anda. Pastikan untuk melakukan backup 
                  secara berkala dan jangan mengakses di komputer umum untuk menjaga keamanan data pribadi.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Tips Penggunaan</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Gunakan nomor yang disamarkan untuk keamanan (contoh: 3171****)</li>
                  <li>• Simpan link resmi untuk verifikasi dokumen</li>
                  <li>• Download surat sebagai PDF untuk hasil terbaik</li>
                  <li>• Review kembali data sebelum mencetak surat resmi</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}