"use client";
import { useState } from "react";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";

interface PhotoInput {
  photoUrl: string;
  description?: string;
}

export default function CreatePlaceForm() {
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    slug: "",
    location: "",
    description: "",
    latitude: "",
    longitude: "",
    categoryId: "",
    photos: [] as PhotoInput[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (
    index: number,
    field: keyof PhotoInput,
    value: string
  ) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos[index] = {
      ...updatedPhotos[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, photos: updatedPhotos }));
  };

  const addPhotoField = () => {
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, { photoUrl: "" }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      categoryId: parseInt(formData.categoryId),
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/places`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Place created:", data);
    } catch (error) {
      console.error("Error creating place:", error);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Short Description</Label>
            <Input
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Slug</Label>
            <Input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Latitude</Label>
              <Input
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Longitude</Label>
              <Input
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label>Category ID</Label>
            <Input
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Photos</Label>
            {formData.photos.map((photo, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Photo URL"
                  value={photo.photoUrl}
                  onChange={(e) =>
                    handlePhotoChange(index, "photoUrl", e.target.value)
                  }
                />
                <Input
                  placeholder="Description (optional)"
                  value={photo.description || ""}
                  onChange={(e) =>
                    handlePhotoChange(index, "description", e.target.value)
                  }
                />
              </div>
            ))}
            <Button type="button" onClick={addPhotoField} variant="outline">
              + Add Photo
            </Button>
          </div>

          <Button type="submit" className="w-full mt-4">
            Create Place
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
